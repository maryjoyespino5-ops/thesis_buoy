// path: src/components/widgets/CommunityFeedCard.jsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { MessageSquare } from "lucide-react";
import { Badge } from "../ui/Badge";

export function CommunityFeedCard() {
  const posts = [
    { user: "Maria S.", message: "Clear waters at Buoy 03 today", time: "2h ago" },
    { user: "Juan D.", message: "Saw fish school near Buoy 01", time: "4h ago" },
    { user: "Ana R.", message: "Weather looks good for tomorrow", time: "6h ago" },
  ];

  return (
    <Card>
      <CardHeader className="p-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-1.5">
          <MessageSquare size={14} className="text-primary-500" />
          Community Feed
        </CardTitle>
        <Badge variant="info" size="sm">3 posts</Badge>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="space-y-2">
          {posts.map((post, i) => (
            <div
              key={i}
              className="p-2 bg-surface-muted/30 rounded-md">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-text-primary">
                  {post.user}
                </span>
                <span className="text-xs text-text-muted">{post.time}</span>
              </div>
              <p className="text-xs text-text-secondary">{post.message}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
