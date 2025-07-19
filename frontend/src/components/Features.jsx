import { LayoutList, Pencil, Sparkles, Share2 } from 'lucide-react';

const steps = [
  {
    title: 'Select Job Type',
    description: 'Choose the type of job you’re applying for — tech, marketing, design, and more.',
    icon: <LayoutList className="w-10 h-10 text-white" />,
    className: 'col-span-3 row-span-1',
  },
  {
    title: 'Describe Yourself',
    description: 'Provide a short description of your skills, background, and experience.',
    icon: <Pencil className="w-10 h-10 text-white" />,
    className: 'col-span-3 row-span-1',
  },
  {
    title: 'Generate Mail',
    description: 'Let our AI generate a professional and tailored job application email in seconds.',
    icon: <Sparkles className="w-10 h-10 text-white" />,
    className: 'col-span-4 row-span-1',
  },
  {
    title: 'Share or Copy',
    description: 'Copy the email or share it instantly — ready to send from your inbox.',
    icon: <Share2 className="w-10 h-10 text-white" />,
    className: 'col-span-2 row-span-1',
  },
];

export default function Feature() {
  return (
    <section className="relative text-black py-20 px-6 overflow-hidden">
      {/* Glow Background */}
     
      {/* Header */}
     

      {/* Bento Grid */}
      <p className='justify-center flex items-center mx-auto font-bold mb-20 text-5xl tracking-tighter'>How does it work</p>
      <div className=" md:flex-row  gap-2 max-w-5xl mx-auto flex flex-col ">
        {steps.map((step, index) => (
          <div
            key={index}
          
            className={` border-neutral-400  bg-neutral-200 border rounded-2xl p-6  hover:scale-105 transition-transform duration-300 flex flex-col ${step.className}`}
          >
            <div className="mb-4 self-center bg-neutral-900 rounded-full justify-center  text-center items-center flex w-fit px-4 py-4">{step.icon}</div>
            <h3 className="text-2xl  tracking-tighter font-sans font-bold self-center  mb-2">{step.title}</h3>
            <p className="text-gray-800 text-sm mt-auto text-center font-medium tracking-tight">{step.description}</p>
          </div>
        ))}
      </div>
       
    </section>
  );
}
