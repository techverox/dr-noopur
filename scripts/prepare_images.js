const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'doctor', 'user-updates');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Map files
const fileMappings = [
  // Area 3: Home & About Our Approach
  { src: 'Photos/MDT_/1000007229.jpg', dest: 'dr-noopur-yellow-consultation.jpg' },
  { src: 'Photos/Mentors/78906f82-658f-4c82-83a3-83f6ba75a303.jpg', dest: 'surgical-care-fellowship.jpg' },
  { src: 'Photos/MDT_/1000008025.jpg', dest: 'accurate-diagnosis-clinical.jpg' },

  // Area 6: Mentorship & MDT
  { src: 'Photos/Mentors/1000008059.jpg', dest: 'mentor-dr-geeta-kadayaprath.jpg' },
  { src: 'Photos/Mentors/1000010552.jpg', dest: 'mentor-dr-rajinder-saggu.jpg' },
  { src: 'Photos/Mentors/b752d8f8-b362-4b2b-9c6e-c340f67904fa.jpg', dest: 'mentors-group-photo.jpg' },
  { src: 'Photos/MDT_/1000006063.jpg', dest: 'mdt-tumor-board-meeting.jpg' },
  { src: 'Photos/MDT_/1000006064.jpg', dest: 'mdt-tumor-board-case-planning.jpg' },
  { src: 'Photos/Support group and activities_/1000008370.jpg', dest: 'mdt-lymphedema-physiotherapy.jpg' },

  // Area 7: Community Outreach & Real Events
  { src: 'Photos/Support group and activities_/1000082873.jpg', dest: 'cancer-warriors-circle-celebration.jpg' },
  { src: 'Photos/Support group and activities_/1000082888.jpg', dest: 'peer-community-hall-gathering.jpg' },
  { src: 'Photos/Support group and activities_/1000082756.jpg', dest: 'recovery-milestone-balloon-arch.jpg' },
  { src: 'Photos/Support group and activities_/1000084625.jpg', dest: 'survivor-empowerment-stage-memento.jpg' },
  { src: 'Photos/Mentors/Camp and awareness_/1000069737.jpg', dest: 'sanjivani-rath-pink-bus-screening.jpg' },
  { src: 'Photos/Mentors/Camp and awareness_/1000069735.jpg', dest: 'md-camp-team-table-consultation.jpg' },
  { src: 'Photos/Mentors/Camp and awareness_/1000000443.jpg', dest: 'public-education-gift-boxes.jpg' },
  { src: 'Photos/Mentors/Camp and awareness_/1000011108.jpg', dest: 'seminar-symposium-stage-mic.jpg' },
  { src: 'Photos/Mentors/Camp and awareness_/06179e9e-eb3e-4773-92e3-faa2c29acfb4.jpg', dest: 'community-talk-blue-uniforms.jpg' },
];

console.log('Copying images...');
for (const item of fileMappings) {
  const fullSrc = path.join(__dirname, '..', item.src);
  const fullDest = path.join(targetDir, item.dest);
  if (fs.existsSync(fullSrc)) {
    fs.copyFileSync(fullSrc, fullDest);
    const stat = fs.statSync(fullDest);
    console.log(`[OK] Copied ${item.src} -> ${item.dest} (${stat.size} bytes)`);
  } else {
    console.log(`[MISSING] Source file not found: ${item.src}`);
  }
}
