import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  Sparkles,
  Zap,
  Video,
  FileText,
  Wand2,
  Shield,
  Clock,
  Palette,
} from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Wand2,
      title: 'AI-Powered Generation',
      description:
        'Transform your text into stunning videos with advanced AI technology',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate professional videos in minutes, not hours',
    },
    {
      icon: FileText,
      title: 'Multiple Formats',
      description: 'Support for text prompts, PDF, and TXT file uploads',
    },
    {
      icon: Palette,
      title: 'Customizable',
      description:
        'Fine-tune every aspect of your video with advanced settings',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and never shared with third parties',
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Create videos whenever inspiration strikes, anytime',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-sky-500 rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 dark:from-blue-400 dark:to-sky-400 bg-clip-text text-transparent">
                TextToVideo
              </span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Content */}
          <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6 sm:mb-8">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                AI-Powered Video Generation
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8 leading-tight">
              Transform Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-sky-600 dark:from-blue-400 dark:to-sky-400 bg-clip-text text-transparent">
                Text Into Videos
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
              Create professional, engaging videos from simple text
              descriptions. Powered by cutting-edge AI technology, our platform
              makes video creation accessible to everyone.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <Button
                onClick={() => navigate('/converter')}
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Get Started
                <Sparkles className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-2 border-slate-300 dark:border-slate-600 px-8 py-6 text-lg rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300"
              >
                Watch Demo
                <Video className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Why Choose Us?
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto px-4">
                Everything you need to create stunning videos from text
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="p-6 sm:p-8 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-sky-500 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white mb-2 sm:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 sm:mt-24 max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-blue-600 to-sky-600 dark:from-blue-700 dark:to-sky-700 border-0 p-8 sm:p-12 text-center overflow-hidden relative">
              <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)]"></div>
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
                  Ready to Create Amazing Videos?
                </h2>
                <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
                  Join thousands of creators who are already transforming their
                  ideas into stunning videos
                </p>
                <Button
                  onClick={() => navigate('/converter')}
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Start Creating Now
                  <Zap className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center text-slate-600 dark:text-slate-400">
            <p>&copy; 2025 TextToVideo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
