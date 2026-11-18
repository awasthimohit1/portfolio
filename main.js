const studies = [
  {
    label: '01 / AGENTIC RETRIEVAL · OPEN SOURCE',
    title: 'Context, connected.',
    sub: 'Autonomous Multi-Agent RAG Pipeline (AI Summarizer)',
    desc: 'Architected a 3-node agentic pipeline (LLM DOM-Scraper, Confidence-Scored Triage Agent, and Technical Extractor) enforcing strict Pydantic JSON schemas. Uses a dual-strategy ingestion engine across 8 tier-one engineering blogs, indexing vector embeddings into ChromaDB and pushing automated Slack briefs.',
    metric: 'Impact: 60% token reduction at $0 cloud compute cost · 99% ingestion success · Saves 5 hrs/week',
    tags: 'Stack: Python · Pydantic · ChromaDB · FAISS · GitHub Actions',
    ctaText: 'View on GitHub ↗',
    // Replace with your direct AI Summarizer repository URL when ready
    ctaHref: 'https://github.com/awasthimohit1/ai_summarizer',
    external: true
  },
  {
    label: '02 / MULTIMODAL SYSTEMS · SIMREKA SOFTWARES',
    title: 'A different way to see.',
    sub: 'Multimodal VLM & Chemical SDS Agentic RAG',
    desc: 'Fine-tuned open-source Vision-Language Models (LLaVA and Pixtral) using parameter-efficient LoRA and 4-bit QLoRA on constrained GPU compute, paired with an Agentic RAG pipeline to extract structured hazard and property tables from 10,000+ heterogeneous Chemical Safety Data Sheets.',
    metric: 'Impact: +85% complex table & molecular parsing accuracy · 70% faster product data enrichment',
    tags: 'Stack: LLaVA · Pixtral · LoRA / QLoRA · Agentic RAG · Python',
    ctaText: 'Ask about this architecture ↓',
    ctaHref: '#connect',
    external: false
  },
  {
    label: '03 / MULTI-AGENT ORCHESTRATION · MIQ DIGITAL',
    title: 'Decisions in motion.',
    sub: 'Multi-Agent Campaign Automation & Enterprise MLOps',
    desc: 'Engineered a chat-based multi-agent orchestration system with automated tool-calling to extract Marketing Mix Modeling (MMM) insights and trigger live DSP budget activations, backed by end-to-end Databricks, MLflow, and Jenkins bidding pipelines with automated drift monitoring.',
    metric: 'Impact: 80% reduction in campaign execution time · Powers real-time bidding at $200M account scale',
    tags: 'Stack: Multi-Agent Orchestration · Tool-Calling · Databricks · MLflow · Jenkins · MMM',
    ctaText: 'Ask about this architecture ↓',
    ctaHref: '#connect',
    external: false
  },
  {
    label: '04 / LANGUAGE & DATA · SIMREKA SOFTWARES',
    title: 'Language into logic.',
    sub: 'Autonomous Text-to-SQL Data Agent',
    desc: 'Built an autonomous LangChain agent translating natural language client queries into validated, executable SQL over multi-gigabyte tabular datasets (1M+ rows) with schema grounding and error recovery.',
    metric: 'Impact: +50% query resolution rate · Saved 25+ hours/month of manual data analysis',
    tags: 'Stack: LangChain · Text-to-SQL · Python · SQL',
    ctaText: 'Ask about this architecture ↓',
    ctaHref: '#connect',
    external: false
  }
];

const modal = document.getElementById('studyModal');
const modalCta = document.getElementById('modalCta');
const closeModalBtn = document.getElementById('closeModal');

function closeStudyModal() {
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'true');
  if (modal.open) modal.close();
}

if (modal && modalCta) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const s = studies[Number(card.dataset.project)];
      if (!s) return;

      document.getElementById('modalLabel').textContent = s.label;
      document.getElementById('modalTitle').textContent = s.title;
      document.getElementById('modalSub').textContent = s.sub;
      document.getElementById('modalDesc').textContent = s.desc;
      document.getElementById('modalMetric').textContent = s.metric;
      document.getElementById('modalTags').textContent = s.tags;
      modalCta.textContent = s.ctaText;
      modalCta.href = s.ctaHref;

      if (s.external) {
        modalCta.target = '_blank';
        modalCta.rel = 'noopener';
      } else {
        modalCta.removeAttribute('target');
        modalCta.removeAttribute('rel');
      }

      modal.removeAttribute('aria-hidden');
      modal.showModal();
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeStudyModal);
  }

  modalCta.addEventListener('click', closeStudyModal);

  // Close when clicking the dark backdrop outside the dialog box
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeStudyModal();
  });

  // Sync aria-hidden if the user presses the ESC key
  modal.addEventListener('close', () => {
    modal.setAttribute('aria-hidden', 'true');
  });
}

const contactForm = document.getElementById('quickContactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const statusEl = document.getElementById('formStatus');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    const payload = {
      access_key: '795cdde4-486d-45fe-9db2-88bd4ab6f5b7',
      subject: `Portfolio Inquiry from ${document.getElementById('senderName').value.trim()}`,
      name: document.getElementById('senderName').value.trim(),
      email: document.getElementById('senderEmail').value.trim(),
      message: document.getElementById('senderMessage').value.trim()
    };

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }
    if (statusEl) statusEl.textContent = 'Sending your message...';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (result.success) {
        if (statusEl) statusEl.textContent = 'Message sent! I will get back to you soon.';
        contactForm.reset();
      } else {
        if (statusEl) statusEl.textContent = `Error: ${result.message || 'Check your Web3Forms access key.'}`;
      }
    } catch (error) {
      if (statusEl) statusEl.textContent = 'Network blocked (check ad-blocker) or email awasthimohit15@gmail.com directly.';
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message →';
      }
    }
  });
}

const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (themeToggle) {
    themeToggle.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
  }
}

// Default to light mode unless dark was previously selected
applyTheme(localStorage.getItem('theme') || 'light');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}