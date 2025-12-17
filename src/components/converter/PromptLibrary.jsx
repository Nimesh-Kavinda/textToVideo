import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Copy, ArrowRight } from 'lucide-react';

export const PromptLibrary = ({ onUsePrompt, colors }) => {
  const promptCategories = [
    {
      name: 'Cinematic',
      prompts: [
        'A futuristic city with flying cars and neon lights, cyberpunk style, 8k resolution, cinematic lighting.',
        'A lone astronaut walking on the surface of Mars, red dust swirling, detailed spacesuit, realistic textures.',
        'Medieval castle on a cliff overlooking a stormy ocean, dramatic lighting, dark fantasy atmosphere.',
      ],
    },
    {
      name: 'Nature',
      prompts: [
        'A serene waterfall in a lush tropical jungle, sunlight filtering through leaves, 4k, photorealistic.',
        'Time-lapse of a blooming rose flower, macro shot, detailed petals, soft background blur.',
        'Snow-covered mountains at sunrise, golden hour light, crisp details, wide angle shot.',
      ],
    },
    {
      name: 'Abstract',
      prompts: [
        'Swirling colors of liquid paint mixing together, slow motion, vibrant colors, abstract art.',
        'Geometric shapes floating in zero gravity, metallic textures, ray tracing, 3d render.',
        'Fractal patterns evolving and changing, psychedelic colors, mesmerizing loop.',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {promptCategories.map((category, index) => (
        <div key={index} className="space-y-3">
          <h3
            className="text-sm font-semibold uppercase tracking-wider"
            style={{ color: colors.text.secondary }}
          >
            {category.name}
          </h3>
          <div className="grid gap-3">
            {category.prompts.map((promptText, pIndex) => (
              <div
                key={pIndex}
                className="p-4 rounded-xl border transition-all hover:shadow-md group"
                style={{
                  backgroundColor: colors.background.card,
                  borderColor: colors.border.main,
                }}
              >
                <p
                  className="text-sm mb-3 line-clamp-2"
                  style={{ color: colors.text.primary }}
                >
                  {promptText}
                </p>
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    onClick={() => onUsePrompt(promptText)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      backgroundColor: colors.primary.main,
                      color: colors.text.white,
                    }}
                  >
                    Use Prompt <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
