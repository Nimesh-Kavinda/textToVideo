import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTheme } from '@/context/ThemeContext';
import { theme as appTheme } from '@/theme/theme';
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
  const { theme } = useTheme();
  const colors = appTheme[theme];

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
      icon: Video,
      title: 'High Quality Output',
      description: 'Export in multiple resolutions up to 4K quality',
    },
    {
      icon: FileText,
      title: 'Multiple Formats',
      description: 'Support for various text inputs and video styles',
    },
    {
      icon: Palette,
      title: 'Customizable',
      description: 'Personalize every aspect of your video creation',
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Create videos whenever inspiration strikes, anytime',
    },
  ];

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: colors.background.page }}
    >
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
        style={{
          backgroundColor: `${colors.background.card}B3`,
          borderColor: colors.border.main,
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center space-x-2">
              <div
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center"
                style={{ background: colors.primary.gradient }}
              >
                <Video
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  style={{ color: colors.text.white }}
                />
              </div>
              <span
                className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent"
                style={{ backgroundImage: colors.primary.gradient }}
              >
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
          <div className="text-center mb-16 sm:mb-24">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 sm:mb-8 border"
              style={{
                backgroundColor: colors.background.hover,
                borderColor: colors.border.light,
              }}
            >
              <Sparkles
                className="w-4 h-4"
                style={{ color: colors.primary.main }}
              />
              <span
                className="text-sm font-medium"
                style={{ color: colors.text.primary }}
              >
                Powered by Advanced AI
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight"
              style={{ color: colors.text.primary }}
            >
              Transform Your Text Into{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: colors.primary.gradient }}
              >
                Videos
              </span>
            </h1>

            <p
              className="text-lg sm:text-xl mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4"
              style={{ color: colors.text.secondary }}
            >
              Create professional, engaging videos from simple text
              descriptions. Powered by cutting-edge AI technology, our platform
              makes video creation accessible to everyone.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <Button
                onClick={() => navigate('/converter')}
                size="lg"
                className="w-full sm:w-auto px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0"
                style={{
                  background: colors.primary.gradient,
                  color: colors.text.white,
                  boxShadow: colors.shadow.lg,
                }}
              >
                Get Started
                <Sparkles className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: colors.border.main,
                  backgroundColor: colors.background.card,
                  color: colors.text.primary,
                }}
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-16 sm:mb-24">
            <h2
              className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16"
              style={{ color: colors.text.primary }}
            >
              Why Choose TextToVideo?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="p-6 sm:p-8 border hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group"
                  style={{
                    backgroundColor: colors.background.card,
                    borderColor: colors.border.main,
                  }}
                >
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: colors.primary.gradient }}
                  >
                    <feature.icon
                      className="w-6 h-6 sm:w-7 sm:h-7"
                      style={{ color: colors.text.white }}
                    />
                  </div>
                  <h3
                    className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3"
                    style={{ color: colors.text.primary }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="leading-relaxed"
                    style={{ color: colors.text.secondary }}
                  >
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 sm:mt-24 max-w-4xl mx-auto">
            <Card
              className="border-0 p-8 sm:p-12 text-center overflow-hidden relative"
              style={{ background: colors.primary.gradient }}
            >
              <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)]"></div>
              <div className="relative z-10">
                <h2
                  className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6"
                  style={{ color: colors.text.white }}
                >
                  Ready to Create Amazing Videos?
                </h2>
                <p
                  className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto"
                  style={{ color: `${colors.text.white}CC` }}
                >
                  Join thousands of creators who are already transforming their
                  ideas into stunning videos
                </p>
                <Button
                  onClick={() => navigate('/converter')}
                  size="lg"
                  className="px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: colors.background.card,
                    color: colors.primary.main,
                  }}
                >
                  Start Creating Now
                  <Zap className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
