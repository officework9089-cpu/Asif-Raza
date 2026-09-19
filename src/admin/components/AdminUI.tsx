import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Plus, Search, RefreshCw, Save, Trash2, X } from 'lucide-react';

export function PageIntro({ title, description, onAdd, addLabel = 'Add New' }: { title: string; description: string; onAdd?: () => void; addLabel?: string }) {
  return (
    <div className="admin-page-intro">
      <div>
        <div className="admin-section-eyebrow">LIVE DATASET</div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {onAdd && <button className="admin-primary-button" onClick={onAdd}><Plus size={17} /> {addLabel}</button>}
    </div>
  );
}

export function Toolbar({ search, setSearch, onRefresh }: { search: string; setSearch: (value: string) => void; onRefresh: () => void }) {
  return (
    <div className="admin-toolbar">
      <div className="admin-search"><Search size={17} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search records…" /></div>
      <button className="admin-secondary-button" onClick={onRefresh}><RefreshCw size={16} /> Refresh</button>
    </div>
  );
}

export function Modal({ open, title, children, onClose, onSave, saving, saveLabel = 'Save Changes' }: { open: boolean; title: string; children: ReactNode; onClose: () => void; onSave: () => void; saving?: boolean; saveLabel?: string }) {
  if (!open) return null;
  return (
    <div className="admin-modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div className="admin-modal" initial={{ opacity: 0, y: 25, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}>
        <div className="admin-modal-header"><div><div className="admin-section-eyebrow">EDITOR</div><h3>{title}</h3></div><button className="admin-icon-button" onClick={onClose}><X size={18} /></button></div>
        <div className="admin-modal-body">{children}</div>
        <div className="admin-modal-footer"><button className="admin-secondary-button" onClick={onClose}>Cancel</button><button className="admin-primary-button" onClick={onSave} disabled={saving}>{saving ? <RefreshCw className="spin" size={16} /> : <Save size={16} />} {saving ? 'Saving…' : saveLabel}</button></div>
      </motion.div>
    </div>
  );
}

export function EmptyState({ text }: { text: string }) {
  return <div className="admin-empty"><div className="admin-empty-icon"><Search size={19} /></div><h3>Nothing found</h3><p>{text}</p></div>;
}

export function DeleteButton({ onClick }: { onClick: () => void }) {
  return <button className="admin-row-icon danger" title="Delete" onClick={onClick}><Trash2 size={16} /></button>;
}
