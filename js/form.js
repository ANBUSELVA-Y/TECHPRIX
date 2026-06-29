/* ==========================================
   TECHPRIX — Contact Form Handler
   Sends requirements to techprix.site@gmail.com
   ========================================== */

(function () {
  const form = document.getElementById('contactForm');
  const msgEl = document.getElementById('formMsg');
  const btnText = document.getElementById('btnText');
  const btnLoader = document.getElementById('btnLoader');
  const submitBtn = document.getElementById('submitBtn');
  const RECIPIENT = 'techprix.site@gmail.com';

  // Pre-fill service from ANY button/link with data-type + smooth scroll to form
  document.querySelectorAll('[data-type]').forEach(el => {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      const serviceSelect = document.getElementById('service');
      const contactSection = document.getElementById('contact');

      // Pre-fill the dropdown
      if (serviceSelect) {
        const val = this.dataset.type;
        for (let opt of serviceSelect.options) {
          if (opt.value === val) { opt.selected = true; break; }
        }
      }

      // Smooth scroll to contact section
      if (contactSection) {
        const offset = 80;
        const top = contactSection.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });

        // Highlight the form after scroll
        setTimeout(() => {
          const formWrap = document.querySelector('.contact-form-wrap');
          if (formWrap) {
            formWrap.classList.add('form-highlight');
            setTimeout(() => formWrap.classList.remove('form-highlight'), 1500);
          }
          // Focus the name field
          const nameField = document.getElementById('name');
          if (nameField) nameField.focus();
        }, 700);
      }
    });
  });

  if (!form) return;

  function showMsg(text, type) {
    msgEl.textContent = text;
    msgEl.className = `form-message ${type}`;
    msgEl.classList.remove('hidden');
    setTimeout(() => { msgEl.classList.add('hidden'); }, 6000);
  }

  function setLoading(loading) {
    if (loading) {
      btnText.classList.add('hidden');
      btnLoader.classList.remove('hidden');
      submitBtn.disabled = true;
    } else {
      btnText.classList.remove('hidden');
      btnLoader.classList.add('hidden');
      submitBtn.disabled = false;
    }
  }

  function buildEmailBody(data) {
    return `
New Service Request from TECHPRIX Website
==========================================

Name:         ${data.name}
Phone:        ${data.phone}
Email:        ${data.email}
College:      ${data.college || 'Not specified'}
Service:      ${data.service}
Budget:       ${data.budget || 'Not specified'}
Deadline:     ${data.deadline || 'Not specified'}

Requirements:
${data.requirements}

==========================================
Sent via: TECHPRIX Website Contact Form
    `.trim();
  }

  function buildMailtoLink(data) {
    const subject = encodeURIComponent(`[TECHPRIX Request] ${data.service} — ${data.name}`);
    const body = encodeURIComponent(buildEmailBody(data));
    return `mailto:${RECIPIENT}?subject=${subject}&body=${body}`;
  }

  // Try Web3Forms (free, no backend needed) → fallback to mailto
  async function sendViaWeb3Forms(data) {
    // Using Formspree-style public endpoint that forwards to email
    // Web3Forms public key for techprix — replace with real key after signup at web3forms.com
    const payload = {
      access_key: 'YOUR_WEB3FORMS_KEY', // Replace with actual key from web3forms.com (free)
      subject: `[TECHPRIX] ${data.service} Request — ${data.name}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      college: data.college || 'Not specified',
      service: data.service,
      budget: data.budget || 'Not specified',
      deadline: data.deadline || 'Not specified',
      requirements: data.requirements,
      from_name: 'TECHPRIX Website',
      replyto: data.email,
    };

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Web3Forms error');
    return true;
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Validation
    const required = ['name', 'phone', 'email', 'service', 'requirements'];
    let valid = true;
    required.forEach(field => {
      const el = form.elements[field];
      if (!el || !el.value.trim()) {
        el && el.classList.add('error-input');
        valid = false;
      } else {
        el && el.classList.remove('error-input');
      }
    });

    if (!valid) {
      showMsg('Please fill in all required fields marked with *', 'error');
      return;
    }

    // Email format
    const emailVal = form.elements['email'].value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      showMsg('Please enter a valid email address.', 'error');
      return;
    }

    const data = {
      name: form.elements['name'].value.trim(),
      phone: form.elements['phone'].value.trim(),
      email: emailVal.trim(),
      college: form.elements['college'].value.trim(),
      service: form.elements['service'].value,
      budget: form.elements['budget'].value,
      requirements: form.elements['requirements'].value.trim(),
      deadline: form.elements['deadline'].value,
    };

    setLoading(true);

    // Try Web3Forms API first (works without backend if key is configured)
    // If key not configured, fall back to mailto
    const hasApiKey = !document.querySelector('[access_key="YOUR_WEB3FORMS_KEY"]');

    try {
      if (hasApiKey) {
        await sendViaWeb3Forms(data);
        showMsg('✅ Your request has been sent! We\'ll contact you within 24 hours.', 'success');
        form.reset();
      } else {
        // Fallback: open mailto client
        const mailtoLink = buildMailtoLink(data);
        window.location.href = mailtoLink;
        showMsg('✅ Your email client is opening. Send the pre-filled message to complete your request!', 'success');
        // Also store in localStorage as backup
        saveRequestLocally(data);
      }
    } catch (err) {
      console.warn('Web3Forms error, falling back to mailto:', err);
      const mailtoLink = buildMailtoLink(data);
      window.location.href = mailtoLink;
      showMsg('✅ Your email client is opening with your request pre-filled. Hit Send to submit!', 'success');
      saveRequestLocally(data);
    }

    setLoading(false);
  });

  function saveRequestLocally(data) {
    try {
      const existing = JSON.parse(localStorage.getItem('techprix_requests') || '[]');
      existing.push({ ...data, timestamp: new Date().toISOString() });
      localStorage.setItem('techprix_requests', JSON.stringify(existing));
    } catch (_) {}
  }

  // Input error styling cleanup
  form.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', () => el.classList.remove('error-input'));
  });
})();

// Add error-input CSS dynamically
(function () {
  const style = document.createElement('style');
  style.textContent = `
    .error-input {
      border-color: rgba(239,68,68,0.6) !important;
      box-shadow: 0 0 0 3px rgba(239,68,68,0.12) !important;
    }
  `;
  document.head.appendChild(style);
})();
