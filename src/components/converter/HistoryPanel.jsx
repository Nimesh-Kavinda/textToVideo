import React, { useState } from 'react';
import {
  History,
  Play,
  Download,
  Copy,
  Trash2,
  Search,
  Filter,
  Calendar,
  Clock,
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export const HistoryPanel = ({
  history,
  onCopyPrompt,
  onDownload,
  onDelete,
  onPreview,
  colors,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Filter and sort history
  const filteredHistory = history
    .filter((item) => {
      const matchesSearch = item.prompt
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterStatus === 'all' || item.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
      return 0;
    });

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

  const formatDate = (date) => {
    const now = new Date();
    const itemDate = new Date(date);
    const diffMs = now - itemDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return itemDate.toLocaleDateString();
  };

  return (
    <Card
      className="border"
      style={{
        backgroundColor: colors.background.card,
        borderColor: colors.border.main,
      }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: colors.secondary.gradient,
              }}
            >
              <History
                className="w-5 h-5"
                style={{ color: colors.text.white }}
              />
            </div>
            <div>
              <h3
                className="font-semibold text-base"
                style={{ color: colors.text.primary }}
              >
                Generation History
              </h3>
              <p className="text-xs" style={{ color: colors.text.tertiary }}>
                {history.length} total generations
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-3 mb-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: colors.text.tertiary }}
            />
            <Input
              type="text"
              placeholder="Search prompts..."
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

          <div className="grid grid-cols-2 gap-3">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger
                className="h-9 text-xs"
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
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger
                className="h-9 text-xs"
                style={{
                  backgroundColor: colors.background.input,
                  borderColor: colors.border.main,
                  color: colors.text.primary,
                }}
              >
                <Calendar className="w-3 h-3 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent
                style={{
                  backgroundColor: colors.background.card,
                  borderColor: colors.border.main,
                }}
              >
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence>
            {filteredHistory.map((item) => {
              const statusColors = getStatusColor(item.status);

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="rounded-lg border p-4 transition-all hover:shadow-md"
                    style={{
                      backgroundColor: colors.background.hover,
                      borderColor: colors.border.main,
                    }}
                  >
                    {/* Header with Status */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="text-xs capitalize"
                          style={{
                            backgroundColor: statusColors.bg,
                            color: statusColors.text,
                            borderColor: statusColors.border,
                          }}
                        >
                          {item.status}
                        </Badge>
                        <span
                          className="text-xs"
                          style={{ color: colors.text.tertiary }}
                        >
                          <Clock className="w-3 h-3 inline mr-1" />
                          {formatDate(item.date)}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(item.id)}
                        className="h-7 w-7"
                        style={{ color: colors.status.error }}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>

                    {/* Prompt Text */}
                    <p
                      className="text-sm mb-3 line-clamp-2"
                      style={{ color: colors.text.primary }}
                    >
                      {item.prompt}
                    </p>

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {item.duration && (
                        <Badge
                          variant="outline"
                          className="text-xs"
                          style={{
                            backgroundColor: colors.background.card,
                            borderColor: colors.border.main,
                            color: colors.text.secondary,
                          }}
                        >
                          {item.duration}
                        </Badge>
                      )}
                      {item.resolution && (
                        <Badge
                          variant="outline"
                          className="text-xs"
                          style={{
                            backgroundColor: colors.background.card,
                            borderColor: colors.border.main,
                            color: colors.text.secondary,
                          }}
                        >
                          {item.resolution}
                        </Badge>
                      )}
                      {item.fps && (
                        <Badge
                          variant="outline"
                          className="text-xs"
                          style={{
                            backgroundColor: colors.background.card,
                            borderColor: colors.border.main,
                            color: colors.text.secondary,
                          }}
                        >
                          {item.fps} FPS
                        </Badge>
                      )}
                      {item.fileSize && (
                        <Badge
                          variant="outline"
                          className="text-xs"
                          style={{
                            backgroundColor: colors.background.card,
                            borderColor: colors.border.main,
                            color: colors.text.secondary,
                          }}
                        >
                          {item.fileSize}
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-2">
                      {item.status === 'completed' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => onPreview(item)}
                            className="h-8 text-xs"
                            style={{
                              background: colors.primary.gradient,
                              color: colors.text.white,
                            }}
                          >
                            <Play className="w-3 h-3 mr-1" />
                            Play
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onDownload(item)}
                            className="h-8 text-xs"
                            style={{
                              backgroundColor: colors.background.card,
                              borderColor: colors.border.main,
                              color: colors.text.primary,
                            }}
                          >
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onCopyPrompt(item.prompt)}
                        className="h-8 text-xs"
                        style={{
                          backgroundColor: colors.background.card,
                          borderColor: colors.border.main,
                          color: colors.text.primary,
                        }}
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredHistory.length === 0 && (
          <div className="text-center py-12">
            <div
              className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: `${colors.primary.main}15`,
              }}
            >
              <History
                className="w-8 h-8"
                style={{ color: colors.primary.main }}
              />
            </div>
            <p
              className="text-sm font-medium mb-1"
              style={{ color: colors.text.secondary }}
            >
              {searchTerm || filterStatus !== 'all'
                ? 'No matching results'
                : 'No generation history'}
            </p>
            <p className="text-xs" style={{ color: colors.text.tertiary }}>
              {searchTerm || filterStatus !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Your generated videos will appear here'}
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${colors.background.card};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${colors.border.main};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${colors.primary.main};
        }
      `}</style>
    </Card>
  );
};
