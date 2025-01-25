import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Image as ImageIcon, Heart, Send } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'تصميم البومات التخرج',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    description: 'البومات تخرج مميزة تحفظ ذكرياتك الجميلة'
  },
  {
    id: 2,
    title: 'تصاميم مواقع التواصل',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
    description: 'تصاميم احترافية لمواقع التواصل الاجتماعي'
  },
  {
    id: 3,
    title: 'هدايا التخرج',
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80',
    description: 'هدايا مميزة تناسب مناسبات التخرج'
  },
];

function App() {
  return (
    <div className="min-h-screen px-4 py-8 md:px-8">
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-12"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="inline-flex items-center gap-2 mb-4"
        >
          <Sparkles className="w-8 h-8 text-primary-dark" />
          <h1 className="text-4xl font-bold text-primary-dark">بطوط</h1>
        </motion.div>
        <p className="text-lg text-gray-700">نصمم لحظاتك الخاصة بلمسة إبداعية</p>
      </motion.header>

      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="relative h-48">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
              <p className="text-gray-600">{project.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-2xl mx-auto text-center bg-white rounded-2xl p-8 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-primary-dark mb-6">تواصلي معنا</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="الاسم"
            className="p-3 rounded-lg border border-gray-200 focus:border-primary focus:outline-none"
          />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            className="p-3 rounded-lg border border-gray-200 focus:border-primary focus:outline-none"
          />
          <textarea
            placeholder="رسالتك"
            rows={4}
            className="p-3 rounded-lg border border-gray-200 focus:border-primary focus:outline-none"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            إرسال
          </motion.button>
        </div>
      </motion.section>

      <footer className="mt-12 text-center text-gray-600">
        <p className="flex items-center justify-center gap-2">
          صنع بكل <Heart className="w-5 h-5 text-primary" /> بواسطة فريق بطوط
        </p>
      </footer>
    </div>
  );
}