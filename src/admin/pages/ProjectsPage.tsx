import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  Edit3,
  ExternalLink,
  FolderKanban,
  Link as LinkIcon,
  Upload,
  X,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import {
  DeleteButton,
  EmptyState,
  Modal,
  PageIntro,
  Toolbar,
} from '../components/AdminUI';

interface ProjectRow {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string | null;
  github_url: string | null;
  demo_url: string | null;
  tech: string[];
  challenges: string | null;
  results: string | null;
}

const PROJECTS_BUCKET = 'projects';

const emptyProject: ProjectRow = {
  id: '',
  title: '',
  description: '',
  category: '',
  image_url: '',
  github_url: '',
  demo_url: '',
  tech: [],
  challenges: '',
  results: '',
};

export default function ProjectsPage() {
  const [rows, setRows] = useState<ProjectRow[]>([]);
  const [form, setForm] = useState<ProjectRow>(emptyProject);

  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Temporary selected image before saving
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError('');

    const { data, error: dbError } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (dbError) {
      setError(dbError.message);
    }

    setRows((data as ProjectRow[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(
    () =>
      rows.filter((r) =>
        `${r.title} ${r.category} ${r.description}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [rows, search]
  );

  const edit = (row?: ProjectRow) => {
    setError('');
    setSelectedImage(null);
    setImagePreview(null);

    setForm(
      row
        ? {
            ...row,
            tech: row.tech ?? [],
          }
        : { ...emptyProject }
    );

    setOpen(true);
  };

  /**
   * Select image from computer
   */
  const handleImageSelect = (file: File | null) => {
    if (!file) return;

    setError('');

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }

    // 5 MB limit
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB.');
      return;
    }

    setSelectedImage(file);

    // Create local preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  /**
   * Upload image to Supabase Storage
   */
  const uploadProjectImage = async (
    file: File,
    projectId: string
  ): Promise<string | null> => {
    setUploading(true);
    setError('');

    try {
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';

      const fileName = `${projectId}-${Date.now()}.${fileExt}`;

      const filePath = `projects/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(PROJECTS_BUCKET)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) {
        throw uploadError;
      }

      return filePath;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Image upload failed.';

      setError(message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  /**
   * Delete image from Supabase Storage
   */
  const deleteProjectImage = async (imagePath: string | null) => {
    if (!imagePath) return;

    const { error: storageError } = await supabase.storage
      .from(PROJECTS_BUCKET)
      .remove([imagePath]);

    if (storageError) {
      console.warn('Could not delete old image:', storageError.message);
    }
  };

  /**
   * Save project
   */
  const save = async (e?: FormEvent) => {
    e?.preventDefault();

    if (!form.id.trim()) {
      setError('Project ID is required.');
      return;
    }

    if (!form.title.trim()) {
      setError('Project title is required.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      let imagePath = form.image_url || null;

      /*
       * If a new image was selected,
       * upload it first.
       */
      if (selectedImage) {
        const uploadedPath = await uploadProjectImage(
          selectedImage,
          form.id
        );

        if (!uploadedPath) {
          setSaving(false);
          return;
        }

        // Delete old image when replacing it
        if (form.image_url) {
          await deleteProjectImage(form.image_url);
        }

        imagePath = uploadedPath;
      }

      const payload = {
        id: form.id,
        title: form.title,
        description: form.description,
        category: form.category,
        image_url: imagePath,
        github_url: form.github_url || null,
        demo_url: form.demo_url || null,
        tech: form.tech.filter(Boolean),
        challenges: form.challenges || null,
        results: form.results || null,
      };

      const { error: dbError } = form.id
        ? await supabase
            .from('projects')
            .update(payload)
            .eq('id', form.id)
        : await supabase.from('projects').insert(payload);

      if (dbError) {
        throw dbError;
      }

      setOpen(false);
      setSelectedImage(null);
      setImagePreview(null);

      await load();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to save project.';

      setError(message);
    } finally {
      setSaving(false);
    }
  };

  /**
   * Delete project
   */
  const remove = async (id: string) => {
    if (
      !window.confirm(
        'Delete this project? Related project features will also be removed.'
      )
    ) {
      return;
    }

    setError('');

    try {
      // Get project first so we know its image
      const { data: project, error: fetchError } = await supabase
        .from('projects')
        .select('image_url')
        .eq('id', id)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      // Delete database record
      const { error: dbError } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (dbError) {
        throw dbError;
      }

      // Delete storage image
      if (project?.image_url) {
        await deleteProjectImage(project.image_url);
      }

      await load();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to delete project.';

      setError(message);
    }
  };

  /**
   * Get public image URL
   *
   * This works when the bucket is public.
   */
  const getImageUrl = (path: string | null) => {
    if (!path) return null;

    // Already a full URL
    if (path.startsWith('http')) {
      return path;
    }

    const { data } = supabase.storage
      .from(PROJECTS_BUCKET)
      .getPublicUrl(path);

    return data.publicUrl;
  };

  return (
    <div className="admin-page-stack">
      <PageIntro
        title="Projects"
        description="Manage portfolio projects, links, technologies, challenges, results, and media."
        onAdd={() => edit()}
        addLabel="New Project"
      />

      <Toolbar
        search={search}
        setSearch={setSearch}
        onRefresh={load}
      />

      {error && <div className="admin-alert error">{error}</div>}

      <section className="admin-table-panel">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Category</th>
                <th>Stack</th>
                <th>Links</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5}>
                    <div className="admin-loading-row" />
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <EmptyState text="Try a different search or create your first project." />
                  </td>
                </tr>
              ) : (
                filtered.map((row) => {
                  const imageUrl = getImageUrl(row.image_url);

                  return (
                    <tr key={row.id}>
                      <td>
                        <div className="admin-cell-title">
                          <div className="admin-thumb h-14 w-14 overflow-hidden">
                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                  borderRadius: '8px',
                                }}
                              />
                            ) : (
                              <FolderKanban size={17} />
                            )}
                          </div>

                          <div>
                            <strong>{row.title}</strong>
                            <span>{row.id}</span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="admin-tag">
                          {row.category}
                        </span>
                      </td>

                      <td>
                        <div className="admin-chip-list">
                          {(row.tech ?? [])
                            .slice(0, 4)
                            .map((t) => (
                              <span key={t}>{t}</span>
                            ))}

                          {(row.tech ?? []).length > 4 && (
                            <span>
                              +{row.tech.length - 4}
                            </span>
                          )}
                        </div>
                      </td>

                      <td>
                        <div className="admin-link-list">
                          {row.github_url && (
                            <a
                              href={row.github_url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <LinkIcon size={13} />
                              GitHub
                            </a>
                          )}

                          {row.demo_url && (
                            <a
                              href={row.demo_url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <ExternalLink size={13} />
                              Demo
                            </a>
                          )}
                        </div>
                      </td>

                      <td>
                        <div className="admin-actions">
                          <button
                            className="admin-row-icon"
                            title="Edit"
                            onClick={() => edit(row)}
                          >
                            <Edit3 size={16} />
                          </button>

                          <DeleteButton
                            onClick={() => remove(row.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      <Modal
        open={open}
        title={form.id ? 'Edit Project' : 'Create Project'}
        onClose={() => {
          if (!saving && !uploading) {
            setOpen(false);
            setSelectedImage(null);
            setImagePreview(null);
          }
        }}
        onSave={() => void save()}
        saving={saving || uploading}
      >
        <div className="admin-form-grid">
          <Field
            label="ID"
            value={form.id}
            onChange={(v) =>
              setForm({ ...form, id: v })
            }
            disabled={!!form.id}
          />

          <Field
            label="Title"
            value={form.title}
            onChange={(v) =>
              setForm({ ...form, title: v })
            }
          />

          <Field
            label="Category"
            value={form.category}
            onChange={(v) =>
              setForm({ ...form, category: v })
            }
          />

          {/* IMAGE UPLOAD */}
          <div className="admin-field full">
            <span>Project Image</span>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {/* Existing / selected image preview */}
              {(imagePreview || form.image_url) && (
                <div
                  style={{
                    position: 'relative',
                    width: '220px',
                    height: '130px',
                  }}
                >
                  <img
                    src={
                      imagePreview ||
                      getImageUrl(form.image_url) ||
                      ''
                    }
                    alt="Project preview"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '10px',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage(null);
                      setImagePreview(null);
                      setForm({
                        ...form,
                        image_url: null,
                      });
                    }}
                    style={{
                      position: 'absolute',
                      top: '6px',
                      right: '6px',
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    title="Remove image"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              <label
                htmlFor="project-image"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: 'fit-content',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                <Upload size={16} />

                {selectedImage
                  ? 'Change Image'
                  : 'Browse Image'}

                <input
                  id="project-image"
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  style={{ display: 'none' }}
                  onChange={(e) =>
                    handleImageSelect(
                      e.target.files?.[0] ?? null
                    )
                  }
                />
              </label>

              <small style={{ opacity: 0.6 }}>
                PNG, JPG, WEBP or GIF. Maximum 5MB.
              </small>

              {uploading && (
                <small>Uploading image...</small>
              )}
            </div>
          </div>

          <Field
            label="GitHub URL"
            value={form.github_url ?? ''}
            onChange={(v) =>
              setForm({
                ...form,
                github_url: v,
              })
            }
          />

          <Field
            label="Demo URL"
            value={form.demo_url ?? ''}
            onChange={(v) =>
              setForm({
                ...form,
                demo_url: v,
              })
            }
          />

          <Field
            label="Tech stack (comma separated)"
            value={(form.tech ?? []).join(', ')}
            onChange={(v) =>
              setForm({
                ...form,
                tech: v
                  .split(',')
                  .map((t) => t.trim())
                  .filter(Boolean),
              })
            }
            full
          />

          <TextArea
            label="Description"
            value={form.description}
            onChange={(v) =>
              setForm({
                ...form,
                description: v,
              })
            }
          />

          <TextArea
            label="Challenges"
            value={form.challenges ?? ''}
            onChange={(v) =>
              setForm({
                ...form,
                challenges: v,
              })
            }
          />

          <TextArea
            label="Results"
            value={form.results ?? ''}
            onChange={(v) =>
              setForm({
                ...form,
                results: v,
              })
            }
          />
        </div>
      </Modal>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  disabled,
  full,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  full?: boolean;
}) {
  return (
    <label
      className={`admin-field ${full ? 'full' : ''}`}
    >
      {label}

      <input
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="admin-field full">
      {label}

      <textarea
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}