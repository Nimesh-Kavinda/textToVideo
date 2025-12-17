import React, { useState } from 'react';
import {
  Play,
  Download,
  Copy,
  Trash2,
  Search,
  Filter,
  Maximize2,
  X,
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export const GeneratedVideosGallery = ({
  videos,
  onCopyPrompt,
  onDownload,
  onDelete,
  onDeleteItems,
  colors,
  isGenerating,
  currentGenerating,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  // Filter videos
  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.prompt
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === 'all' || video.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const toggleSelection = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredVideos.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredVideos.map((item) => item.id));
    }
  };

  const handleBulkDelete = () => {
    if (onDeleteItems) {
      onDeleteItems(selectedItems);
      setSelectedItems([]);
    }
  };

  const handleBulkDownload = () => {
    const selectedVideos = videos.filter((v) => selectedItems.includes(v.id));
    selectedVideos.forEach((video) => {
      if (video.status === 'completed') {
        onDownload(video);
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return {
          bg: `${colors.status.success}15`,
          text: colors.status.success,
          border: colors.status.success,
        };
      case 'failed':
        return {
          bg: `${colors.status.error}15`,
          text: colors.status.error,
          border: colors.status.error,
        };
      case 'processing':
        return {
          bg: `${colors.status.warning}15`,
          text: colors.status.warning,
          border: colors.status.warning,
        };
      default:
        return {
          bg: colors.background.hover,
          text: colors.text.secondary,
          border: colors.border.main,
        };
    }
  };

  return (
    <Card
      className="border"
      style={{
        backgroundColor: colors.background.card,
        borderColor: colors.border.main,
      }}
    >
      <div className="p-4 lg:p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3
                className="font-semibold text-lg lg:text-xl"
                style={{ color: colors.text.primary }}
              >
                Generated Videos
              </h3>
              <p
                className="text-xs lg:text-sm mt-1"
                style={{ color: colors.text.tertiary }}
              >
                {videos.length} {videos.length === 1 ? 'video' : 'videos'} total
              </p>
            </div>

            {videos.length > 0 && (
              <div className="flex items-center gap-3">
                {selectedItems.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleBulkDownload}
                      className="h-8 text-xs"
                    >
                      <Download className="w-3.5 h-3.5 mr-1.5" />
                      Download ({selectedItems.length})
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleBulkDelete}
                      className="h-8 text-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                      Delete ({selectedItems.length})
                    </Button>
                  </div>
                )}
                <div className="flex items-center gap-2 ml-2">
                  <Checkbox
                    checked={
                      filteredVideos.length > 0 &&
                      selectedItems.length === filteredVideos.length
                    }
                    onCheckedChange={toggleSelectAll}
                    colors={colors}
                  />
                  <span
                    className="text-xs"
                    style={{ color: colors.text.secondary }}
                  >
                    Select All
                  </span>
                </div>
              </div>
            )}
          </div>

          {videos.length > 0 && (
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger
                  className="h-9 text-xs w-[120px]"
                  style={{
                    backgroundColor: colors.background.input,
                    borderColor: colors.border.main,
                    color: colors.text.primary,
                  }}
                >
                  <Filter className="w-3 h-3 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  style={{
                    backgroundColor: colors.background.card,
                    borderColor: colors.border.main,
                  }}
                >
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Search Bar */}
        {videos.length > 3 && (
          <div className="mb-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: colors.text.tertiary }}
              />
              <Input
                type="text"
                placeholder="Search videos by prompt..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 text-sm"
                style={{
                  backgroundColor: colors.background.input,
                  borderColor: colors.border.main,
                  color: colors.text.primary,
                }}
              />
            </div>
          </div>
        )}

        {/* Currently Generating Banner */}
        {isGenerating && currentGenerating && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 rounded-lg border-2"
            style={{
              backgroundColor: `${colors.primary.main}10`,
              borderColor: colors.primary.main,
            }}
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center animate-pulse"
                  style={{ backgroundColor: `${colors.primary.main}20` }}
                >
                  <Play
                    className="w-5 h-5"
                    style={{ color: colors.primary.main }}
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-semibold"
                  style={{ color: colors.text.primary }}
                >
                  Generating Video...
                </p>
                <p
                  className="text-xs line-clamp-1 mt-1"
                  style={{ color: colors.text.secondary }}
                >
                  {currentGenerating}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Video Gallery Grid */}
        {filteredVideos.length > 0 ? (
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            }}
          >
            <AnimatePresence>
              {filteredVideos.map((video) => {
                const statusColors = getStatusColor(video.status);

                return (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className="rounded-lg border overflow-hidden transition-all hover:shadow-lg group relative flex flex-col h-full"
                      style={{
                        backgroundColor: colors.background.hover,
                        borderColor: selectedItems.includes(video.id)
                          ? colors.primary.main
                          : colors.border.main,
                      }}
                    >
                      {/* Selection Checkbox */}
                      <div className="absolute top-2 left-2 z-20">
                        <Checkbox
                          checked={selectedItems.includes(video.id)}
                          onCheckedChange={() => toggleSelection(video.id)}
                          colors={colors}
                          className="bg-black/50 border-white/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                      </div>

                      {/* Video Preview Thumbnail */}
                      <div
                        className="relative aspect-video cursor-pointer overflow-hidden"
                        style={{ backgroundColor: colors.background.input }}
                        onClick={() => setSelectedVideo(video)}
                      >
                        {video.status === 'completed' ? (
                          <>
                            {/* Placeholder for video thumbnail */}
                            <div
                              className="absolute inset-0 flex items-center justify-center"
                              style={{
                                background: `linear-gradient(135deg, ${colors.primary.main}20, ${colors.secondary.main}20)`,
                                backgroundImage: video.thumbnail
                                  ? `url(${video.thumbnail})`
                                  : `linear-gradient(135deg, ${colors.primary.main}20, ${colors.secondary.main}20)`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                              }}
                            >
                              {!video.thumbnail && (
                                <div className="text-center">
                                  <Play
                                    className="w-12 h-12 mx-auto mb-2 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all"
                                    style={{ color: colors.text.white }}
                                  />
                                  <p
                                    className="text-xs font-medium"
                                    style={{ color: colors.text.white }}
                                  >
                                    {video.duration} • {video.resolution}
                                  </p>
                                </div>
                              )}
                            </div>
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                              <Maximize2
                                className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-all"
                                style={{ color: colors.text.white }}
                              />
                            </div>
                          </>
                        ) : video.status === 'processing' ? (
                          <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ backgroundColor: colors.background.input }}
                          >
                            <div className="text-center">
                              <div
                                className="w-12 h-12 mx-auto mb-2 rounded-full border-4 border-t-transparent animate-spin"
                                style={{ borderColor: colors.primary.main }}
                              />
                              <p
                                className="text-xs font-medium"
                                style={{ color: colors.text.secondary }}
                              >
                                Processing...
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{
                              backgroundColor: `${colors.status.error}10`,
                            }}
                          >
                            <p
                              className="text-xs font-medium"
                              style={{ color: colors.status.error }}
                            >
                              Failed to generate
                            </p>
                          </div>
                        )}

                        {/* Status Badge */}
                        <div className="absolute top-2 right-2">
                          <Badge
                            variant="outline"
                            className="text-xs capitalize backdrop-blur-sm"
                            style={{
                              backgroundColor: statusColors.bg,
                              color: statusColors.text,
                              borderColor: statusColors.border,
                            }}
                          >
                            {video.status}
                          </Badge>
                        </div>
                      </div>

                      {/* Video Info */}
                      <div className="p-3 flex flex-col flex-1">
                        <p
                          className="text-sm font-medium mb-2 line-clamp-2 min-h-[2.5rem]"
                          style={{ color: colors.text.primary }}
                        >
                          {video.prompt}
                        </p>

                        {/* Metadata */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {video.fps && (
                            <Badge
                              variant="outline"
                              className="text-[10px] h-5 px-1.5"
                              style={{
                                backgroundColor: colors.background.card,
                                borderColor: colors.border.main,
                                color: colors.text.tertiary,
                              }}
                            >
                              {video.fps} FPS
                            </Badge>
                          )}
                          {video.fileSize && (
                            <Badge
                              variant="outline"
                              className="text-[10px] h-5 px-1.5"
                              style={{
                                backgroundColor: colors.background.card,
                                borderColor: colors.border.main,
                                color: colors.text.tertiary,
                              }}
                            >
                              {video.fileSize}
                            </Badge>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-auto grid grid-cols-3 gap-1.5">
                          {video.status === 'completed' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onDownload(video)}
                              className="h-7 text-[10px] px-1 w-full"
                              style={{
                                backgroundColor: colors.background.card,
                                borderColor: colors.border.main,
                                color: colors.text.primary,
                              }}
                            >
                              <Download className="w-3 h-3 mr-1" />
                              Save
                            </Button>
                          )}

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onCopyPrompt(video.prompt)}
                            className="h-7 text-[10px] px-1 w-full"
                            style={{
                              backgroundColor: colors.background.card,
                              borderColor: colors.border.main,
                              color: colors.text.primary,
                            }}
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </Button>

                          {video.status === 'completed' && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => onDelete(video.id)}
                              className="h-7 text-[10px] px-1 w-full"
                              style={{ color: colors.status.error }}
                            >
                              <Trash2 className="w-3 h-3 mr-1" />
                              Del
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-12">
            <div
              className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: `${colors.primary.main}10`,
              }}
            >
              <Play
                className="w-10 h-10"
                style={{ color: colors.primary.main }}
              />
            </div>
            <p
              className="text-base font-medium mb-2"
              style={{ color: colors.text.primary }}
            >
              {searchTerm || filterStatus !== 'all'
                ? 'No videos found'
                : 'No videos generated yet'}
            </p>
            <p className="text-sm" style={{ color: colors.text.tertiary }}>
              {searchTerm || filterStatus !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Generated videos will appear here'}
            </p>
          </div>
        )}
      </div>

      {/* Video Preview Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Card
                className="border-0"
                style={{
                  backgroundColor: colors.background.card,
                }}
              >
                <div className="relative">
                  {/* Close Button */}
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setSelectedVideo(null)}
                    className="absolute top-2 right-2 z-10 rounded-full"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      color: colors.text.white,
                    }}
                  >
                    <X className="w-5 h-5" />
                  </Button>

                  {/* Video Player Placeholder */}
                  <div
                    className="aspect-video rounded-t-lg flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${colors.primary.main}30, ${colors.secondary.main}30)`,
                    }}
                  >
                    <div className="text-center">
                      <Play
                        className="w-20 h-20 mx-auto mb-4"
                        style={{ color: colors.text.white }}
                      />
                      <p
                        className="text-lg font-semibold mb-2"
                        style={{ color: colors.text.white }}
                      >
                        Video Player
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: colors.text.white }}
                      >
                        {selectedVideo.duration} • {selectedVideo.resolution} •{' '}
                        {selectedVideo.fps} FPS
                      </p>
                    </div>
                  </div>

                  {/* Video Details */}
                  <div className="p-6">
                    <h4
                      className="text-lg font-semibold mb-2"
                      style={{ color: colors.text.primary }}
                    >
                      Prompt
                    </h4>
                    <p
                      className="text-sm mb-4"
                      style={{ color: colors.text.secondary }}
                    >
                      {selectedVideo.prompt}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        onClick={() => onDownload(selectedVideo)}
                        className="h-10"
                        style={{
                          background: colors.primary.gradient,
                          color: colors.text.white,
                        }}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Video
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          onCopyPrompt(selectedVideo.prompt);
                          setSelectedVideo(null);
                        }}
                        className="h-10"
                        style={{
                          backgroundColor: colors.background.card,
                          borderColor: colors.border.main,
                          color: colors.text.primary,
                        }}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Prompt
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};
