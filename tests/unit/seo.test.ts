import fs from 'fs';
import path from 'path';

describe('Enterprise & AI SEO Tests', () => {
  it('should verify public/llms.txt exists and contains Core Business Info', () => {
    const llmsPath = path.join(process.cwd(), 'public', 'llms.txt');
    expect(fs.existsSync(llmsPath)).toBe(true);

    const content = fs.readFileSync(llmsPath, 'utf8');
    expect(content).toContain('Crown Watch Co.');
    expect(content).toContain('Dhaka');
    expect(content).toContain('BDT');
  });

  it('should verify public/llms-full.txt exists with product specifications', () => {
    const llmsFullPath = path.join(process.cwd(), 'public', 'llms-full.txt');
    expect(fs.existsSync(llmsFullPath)).toBe(true);

    const content = fs.readFileSync(llmsFullPath, 'utf8');
    expect(content).toContain('Casio G-Shock CasiOak');
    expect(content).toContain('Seiko 5 Sports Automatic');
    expect(content).toContain('Citizen Eco-Drive');
  });
});
