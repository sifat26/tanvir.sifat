import { Download, ExternalLink, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { personal } from '../../data/portfolio';

/**
 * ResumeCard — a compact preview of the resume: title, last-updated, format,
 * and download / view actions. Deliberately does NOT embed the PDF (an <iframe>
 * or <embed> tanks mobile performance and layout); it links out instead, which
 * keeps the section light and responsive. Renders nothing until a resume URL
 * is set on `personal`.
 */
const ResumeCard = () => {
  const { resumeUrl, resumeDocx, resumeUpdated, name } = personal;
  if (!resumeUrl || resumeUrl === '[ADD_RESUME_URL]') return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4 }}
      className='card p-6 md:p-7 flex flex-col sm:flex-row sm:items-center gap-6'
    >
      {/* Icon + meta */}
      <div className='flex items-start gap-4 flex-1 min-w-0'>
        <span className='w-12 h-12 grid place-items-center rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text)] shrink-0'>
          <FileText className='w-5 h-5' />
        </span>
        <div className='min-w-0'>
          <h3 className='text-[16px] font-semibold text-[var(--text)]'>{name} — Resume</h3>
          <div className='mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12.5px] text-[var(--text-muted)] font-mono'>
            <span>PDF</span>
            <span aria-hidden='true'>·</span>
            <span>Updated {resumeUpdated}</span>
            <span aria-hidden='true'>·</span>
            <a href={resumeDocx} download className='hover:text-[var(--text)] underline-offset-2 hover:underline'>
              Word version
            </a>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className='flex items-center gap-2.5 shrink-0'>
        <a href={resumeUrl} download target='_blank' rel='noopener noreferrer' className='btn btn-primary text-[13px]'>
          <Download className='w-3.5 h-3.5' />
          Download
        </a>
        <a href={resumeUrl} target='_blank' rel='noopener noreferrer' className='btn btn-secondary text-[13px]'>
          View
          <ExternalLink className='w-3.5 h-3.5' />
        </a>
      </div>
    </motion.div>
  );
};

export default ResumeCard;
