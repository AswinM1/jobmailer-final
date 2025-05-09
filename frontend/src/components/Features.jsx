import { LayoutList, Pencil, Sparkles, Share2 } from 'lucide-react';

const steps = [
  {
    title: 'Select Job Type',
    description: 'Choose the type of job you’re applying for — tech, marketing, design, and more.',
    icon: <LayoutList className="w-10 h-10 text-emerald-400" />,
  },
  {
    title: ' Describe Yourself',
    description: 'Provide a short description of your skills, background, and experience.',
    icon: <Pencil className="w-10 h-10 text-blue-400" />,
  },
  {
    title: 'Generate Mail',
    description: 'Let our AI generate a professional and tailored job application email in seconds.',
    icon: <Sparkles className="w-10 h-10 text-purple-400" />,
  },
  {
    title: 'Share or Copy',
    description: 'Copy the email or share it instantly — ready to send from your inbox.',
    icon: <Share2 className="w-10 h-10 text-yellow-400" />,
  },
];
export default function Feature() {
  return (
    <section className="relative text-white py-20 px-6 overflow-hidden">
      {/* Radial Glow Background */}
      <div className="absolute  flex justify-center items-center pointer-events-none z-0">
        <div className="w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(253,186,116,0.4)_0%,_transparent_70%)] rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-serif  italic tracking-tight mb-4">
          How does it work
        </h2>
        <p className="text-gray-400 text-lg">
          Just a few steps to craft the perfect job application email.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-gradient-to-b from-black  rounded-2xl p-6 text-left hover:shadow-lg hover:scale-105 transition duration-300"
          >

            <div className="mb-4 ">{step.icon}</div>
            <h3 className="text-xl font-serif italic mb-2">{step.title}</h3>
            <p className="text-gray-400 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
