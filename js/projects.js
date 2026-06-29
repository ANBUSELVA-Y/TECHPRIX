/* ==========================================
   TECHPRIX — Projects Showcase
   ========================================== */

const PROJECTS = [
  {
    domain: 'AI / Machine Learning',
    title: 'Multimodal Emotion Recognition System Using Transformer Architecture',
    desc: 'Real-time emotion detection from audio, facial expressions, and text simultaneously using a fine-tuned Vision-Language Transformer model.',
    stack: ['Python', 'PyTorch', 'HuggingFace', 'OpenCV', 'FastAPI']
  },
  {
    domain: 'Blockchain',
    title: 'Decentralized Academic Credential Verification Platform',
    desc: 'Tamper-proof certificate issuance and verification system built on Ethereum smart contracts, eliminating fake credential fraud.',
    stack: ['Solidity', 'React', 'Web3.js', 'IPFS', 'MetaMask']
  },
  {
    domain: 'IoT / Embedded',
    title: 'AI-Powered Smart Agriculture Monitoring & Prediction Dashboard',
    desc: 'ESP32-based sensor network collecting soil moisture, temperature, and crop health data with ML-based yield prediction and automated irrigation.',
    stack: ['ESP32', 'Python', 'TensorFlow', 'MQTT', 'Grafana']
  },
  {
    domain: 'Cybersecurity',
    title: 'Network Intrusion Detection System with Federated Learning',
    desc: 'Privacy-preserving IDS that trains across distributed hospital networks without sharing raw data, achieving 97.3% detection accuracy.',
    stack: ['Python', 'Flower', 'Scikit-learn', 'Wireshark', 'Docker']
  },
  {
    domain: 'Natural Language Processing',
    title: 'Regional Language Legal Document Summarization AI',
    desc: 'Summarizes Tamil, Telugu, and Hindi legal documents using a custom-trained BERT model with 89% ROUGE score on court judgments.',
    stack: ['Python', 'BERT', 'HuggingFace', 'FastAPI', 'React']
  },
  {
    domain: 'Computer Vision',
    title: 'Autonomous Drone Navigation with Obstacle Avoidance',
    desc: 'YOLO-v8 based real-time obstacle detection and path planning for FPV drones using edge computing on NVIDIA Jetson Nano.',
    stack: ['YOLOv8', 'ROS2', 'Jetson Nano', 'Python', 'C++']
  },
  {
    domain: 'Healthcare AI',
    title: 'Diabetic Retinopathy Detection from Fundus Images',
    desc: 'CNN-based grading system for early detection of retinopathy stages from retinal scans, achieving 95.2% sensitivity on clinical dataset.',
    stack: ['TensorFlow', 'Keras', 'OpenCV', 'Flask', 'PostgreSQL']
  },
  {
    domain: 'FinTech',
    title: 'Crypto Portfolio Risk Analyzer with Sentiment Intelligence',
    desc: 'Real-time crypto portfolio tracker combining on-chain data, Twitter sentiment analysis, and Monte Carlo simulations for risk forecasting.',
    stack: ['Python', 'React', 'Node.js', 'Web3', 'Binance API']
  },
  {
    domain: 'AR / XR',
    title: 'WebXR Campus Navigation & Interactive Tour System',
    desc: 'Augmented reality campus navigation for new students with real-time overlays, faculty office finders, and event AR markers using WebXR.',
    stack: ['Three.js', 'WebXR', 'React', 'Node.js', 'MongoDB']
  },
  {
    domain: 'Systems Programming',
    title: 'Custom RISC-V CPU Emulator with Real-Time Debugger',
    desc: 'Full 32-bit RISC-V ISA emulator written in Rust with a visual pipeline debugger, memory viewer, and assembler — runs on web browser via WASM.',
    stack: ['Rust', 'WASM', 'WebAssembly', 'React', 'TypeScript']
  },
  {
    domain: 'EdTech',
    title: 'Adaptive Learning Platform with Knowledge Graph AI',
    desc: 'Personalized study path generator using Neo4j knowledge graphs and reinforcement learning to adapt to each student\'s learning pace and style.',
    stack: ['Neo4j', 'Python', 'React', 'FastAPI', 'Redis']
  },
  {
    domain: 'Smart City',
    title: 'Real-Time Traffic Optimization with Multi-Agent Reinforcement Learning',
    desc: 'Intelligent traffic signal control system using MARL algorithms, reducing average wait time by 34% in SUMO simulation benchmarks.',
    stack: ['Python', 'SUMO', 'PyTorch', 'MARL', 'Redis']
  },
  {
    domain: 'Robotics',
    title: 'Gesture-Controlled Robotic Arm with Haptic Feedback Glove',
    desc: 'MediaPipe-powered hand gesture recognition controlling a 6-DOF robotic arm with real-time haptic resistance feedback via servo glove.',
    stack: ['MediaPipe', 'Arduino', 'Python', 'ROS', 'OpenCV']
  },
  {
    domain: 'Green Tech',
    title: 'Solar Panel Fault Detection via Thermal Imaging & AI',
    desc: 'Drone-mounted IR camera system with CNN classification for hotspot detection on large solar farms, reducing inspection cost by 60%.',
    stack: ['Python', 'TensorFlow', 'OpenCV', 'DJI SDK', 'Flask']
  },
  {
    domain: 'Social Impact',
    title: 'Sign Language to Text Real-Time Translation App',
    desc: 'Mobile app translating Indian Sign Language gestures to text and speech in real-time using custom-trained CNN with 94% gesture accuracy.',
    stack: ['Flutter', 'TensorFlow Lite', 'Firebase', 'Dart', 'Python']
  }
];

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((p, i) => `
    <div class="project-card reveal delay-${(i % 3) + 1}">
      <div class="project-number">PROJECT ${String(i + 1).padStart(2, '0')}</div>
      <span class="project-domain">${p.domain}</span>
      <h4>${p.title}</h4>
      <p>${p.desc}</p>
      <div class="project-stack">
        ${p.stack.map(s => `<span>${s}</span>`).join('')}
      </div>
    </div>
  `).join('');

  // Re-trigger scroll observer for newly added cards
  if (window.techprixObserver) {
    document.querySelectorAll('.project-card').forEach(el => {
      window.techprixObserver.observe(el);
    });
  }
}

document.addEventListener('DOMContentLoaded', renderProjects);
