import { LayoutList, Pencil, Sparkles, Share2 } from 'lucide-react';

const steps = [
  {
    title: 'Select Job Type',
    description: 'Choose the type of job you’re applying for — tech, marketing, design, and more.',
    icon: <LayoutList className="w-10 h-10 text-emerald-400" />,
    className: 'col-span-3 row-span-1',
  },
  {
    title: 'Describe Yourself',
    description: 'Provide a short description of your skills, background, and experience.',
    icon: <Pencil className="w-10 h-10 text-blue-400" />,
    className: 'col-span-3 row-span-1',
  },
  {
    title: 'Generate Mail',
    description: 'Let our AI generate a professional and tailored job application email in seconds.',
    icon: <Sparkles className="w-10 h-10 text-purple-400" />,
    className: 'col-span-4 row-span-1',
  },
  {
    title: 'Share or Copy',
    description: 'Copy the email or share it instantly — ready to send from your inbox.',
    icon: <Share2 className="w-10 h-10 text-yellow-400" />,
    className: 'col-span-2 row-span-1',
  },
];

export default function Feature() {
  return (
    <section className="relative text-white py-20 px-6 overflow-hidden">
      {/* Glow Background */}
     
      {/* Header */}
     

      {/* Bento Grid */}
      <div className="relative z-10 grid grid-cols-6 auto-rows-[200px] gap-2 max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            style={{
              background:"radial-gradient(circle at bottom right,orange 1%,black 40%)"
            }}
            className={` border-neutral-800  border rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-transform duration-300 flex flex-col ${step.className}`}
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-2xl  tracking-tighter font-sans font-bold  mb-2">{step.title}</h3>
            <p className="text-gray-400 text-sm mt-auto">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
