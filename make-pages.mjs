import fs from 'fs';
import path from 'path';

for (const ext of ['true', 'false']) {
  for (const reasoner of ['EYE', 'N3', 'HYLAR']) {
    fs.writeFileSync(path.join(process.cwd(), 'webpage-' + reasoner + '-' + ext + '.html'),
      fs.readFileSync(path.join(process.cwd(), 'webpage.template.html')).toString().replaceAll('{{REASONER}}', reasoner).replace('{{EXTENDED}}', ext))
  }
}
