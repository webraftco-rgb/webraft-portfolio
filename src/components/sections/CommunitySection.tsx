import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, ThumbsUp, Send, Loader2, AlertCircle, CheckCircle2, ShieldAlert } from "lucide-react";
import { fadeIn } from "../../lib/animations";
import { getSupabase } from "../../lib/supabase";

interface Comment {
  id: string;
  name: string;
  comment: string;
  likes: number;
  created_at: string;
}

const CommunitySection = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // Not stored in DB per request
  const [text, setText] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfigMissing, setIsConfigMissing] = useState(false);

  // Fetch comments
  const fetchComments = async () => {
    const supabase = getSupabase();
    if (!supabase) {
      setIsConfigMissing(true);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      setIsConfigMissing(true);
      setIsLoading(false);
      return;
    }

    fetchComments();

    // Set up real-time subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
        },
        () => {
          fetchComments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const supabase = getSupabase();
    if (!supabase) {
      setIsError(true);
      return;
    }

    // Honeypot check
    if (honeypot) return;
    if (!name || !email || !text || text.length > 300) return;

    setIsSubmitting(true);
    setIsError(false);

    try {
      const { error } = await supabase
        .from('comments')
        .insert([
          { 
            name, 
            comment: text 
          }
        ]);

      if (error) throw error;

      setIsSuccess(true);
      setName("");
      setEmail("");
      setText("");

      setTimeout(() => setIsSuccess(false), 2000);
    } catch (error) {
      console.error("Error posting comment:", error);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (id: string, currentLikes: number) => {
    const supabase = getSupabase();
    if (!supabase) return;

    try {
      const { error } = await supabase
        .from('comments')
        .update({ likes: currentLikes + 1 })
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const getTimeAgo = (dateString: string) => {
    const timestamp = new Date(dateString).getTime();
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return "just now";
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <section id="community" className="py-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="px-3 py-1 bg-accent/10 text-accent text-[12px] font-bold tracking-wider uppercase rounded-full mb-4"
          >
            Community
          </motion.span>
          <motion.h2 
            {...fadeIn}
            className="text-3xl md:text-4xl font-bold text-primary-text mb-4"
          >
            Join the conversation
          </motion.h2>
          <motion.p 
            {...fadeIn}
            className="text-secondary-text max-w-2xl text-lg"
          >
            Share your thoughts or questions about web design and growing your business online.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Form Side */}
          <div className="lg:col-span-5">
            <motion.div 
              {...fadeIn}
              className="bg-white border border-[#E4E4E7] rounded-lg p-8 shadow-sm relative overflow-hidden"
            >
              <AnimatePresence>
                {isConfigMissing && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 z-30 bg-white/98 flex flex-col items-center justify-center text-center p-8"
                  >
                    <ShieldAlert className="w-12 h-12 text-amber-500 mb-4" />
                    <h3 className="text-xl font-bold text-primary-text mb-2">Setup Required</h3>
                    <p className="text-secondary-text text-[14px]">
                      Please add <strong>VITE_SUPABASE_URL</strong> and <strong>VITE_SUPABASE_ANON_KEY</strong> to your environment variables to enable community features.
                    </p>
                  </motion.div>
                )}
                
                {isSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute inset-0 z-20 bg-white/95 flex flex-col items-center justify-center text-center p-6"
                  >
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-primary-text mb-2">Comment posted!</h3>
                    <p className="text-secondary-text">Thanks for joining the conversation.</p>
                  </motion.div>
                )}

                {isError && !isSubmitting && (
                   <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-50 border border-red-100 rounded-md flex items-start gap-3"
                  >
                    <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                    <div>
                      <p className="text-[14px] text-red-700 font-medium">Failed to post comment</p>
                      <button 
                        onClick={handleSubmit}
                        className="text-[12px] text-red-600 underline hover:text-red-800 font-semibold"
                      >
                        Try again
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot */}
                <input 
                  type="text" 
                  className="hidden" 
                  value={honeypot} 
                  onChange={(e) => setHoneypot(e.target.value)} 
                />

                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-[13px] font-bold text-primary-text uppercase tracking-tight">Name</label>
                  <input 
                    id="name"
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 bg-white border border-[#E4E4E7] rounded-md focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all text-primary-text text-[15px]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-[13px] font-bold text-primary-text uppercase tracking-tight">Email <span className="text-secondary-text font-normal lowercase">(not stored)</span></label>
                  <input 
                    id="email"
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2.5 bg-white border border-[#E4E4E7] rounded-md focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all text-primary-text text-[15px]"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label htmlFor="comment" className="text-[13px] font-bold text-primary-text uppercase tracking-tight">Comment</label>
                    <span className={`text-[11px] font-mono ${text.length > 300 ? 'text-red-500 font-bold' : 'text-secondary-text'}`}>
                      {text.length}/300
                    </span>
                  </div>
                  <textarea 
                    id="comment"
                    required
                    maxLength={300}
                    rows={4}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="What's on your mind?"
                    className="w-full px-4 py-2.5 bg-white border border-[#E4E4E7] rounded-md focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all text-primary-text text-[15px] resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting || text.length === 0 || text.length > 300}
                  className="w-full py-3 bg-accent text-white font-bold rounded-md hover:bg-accent-hover transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Post Comment
                      <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Comments Side */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <MessageSquare className="text-accent" size={24} />
                <h3 className="text-xl font-bold text-primary-text">
                  Recent Thoughts
                </h3>
              </div>
              <p className="text-[13px] font-bold text-accent px-2 py-0.5 bg-accent/5 rounded">
                LIVE UPDATES
              </p>
            </div>

            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar min-h-[200px]">
              <AnimatePresence initial={false} mode="popLayout">
                {isConfigMissing ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20 border-2 border-dashed border-[#E4E4E7] rounded-xl flex flex-col items-center px-4"
                  >
                    <ShieldAlert className="w-10 h-10 text-amber-200 mb-4" />
                    <p className="text-secondary-text font-medium">Comments collection is unavailable.</p>
                    <p className="text-[12px] text-secondary-text mt-2">Check environment variables.</p>
                  </motion.div>
                ) : isLoading ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-secondary-text"
                  >
                    <Loader2 className="w-8 h-8 animate-spin mb-4 opacity-20" />
                    <p>Loading community comments...</p>
                  </motion.div>
                ) : comments.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16 border-2 border-dashed border-[#E4E4E7] rounded-xl flex flex-col items-center"
                  >
                    <MessageSquare className="w-10 h-10 text-zinc-300 mb-4" />
                    <p className="text-secondary-text font-medium">No comments yet. Be the first to share your thoughts!</p>
                  </motion.div>
                ) : (
                  comments.map((comment) => (
                    <motion.div 
                      key={comment.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white border border-[#E4E4E7] rounded-lg p-6 shadow-sm hover:shadow-md transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 flex-shrink-0 bg-accent text-white rounded-full flex items-center justify-center font-bold text-lg select-none">
                          {comment.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-bold text-primary-text truncate">{comment.name}</h4>
                            <span className="text-[12px] text-secondary-text whitespace-nowrap">{getTimeAgo(comment.created_at)}</span>
                          </div>
                          <p className="text-secondary-text leading-relaxed whitespace-pre-wrap break-words text-[15px]">
                            {comment.comment}
                          </p>
                          <div className="mt-4 pt-4 border-t border-[#F4F4F5] flex items-center justify-between">
                            <motion.button 
                              whileTap={{ scale: 1.2 }}
                              onClick={() => handleLike(comment.id, comment.likes)}
                              className="flex items-center gap-1.5 text-[12px] font-bold text-secondary-text hover:text-accent transition-colors group/btn"
                            >
                              <ThumbsUp size={14} className="group-hover/btn:scale-110 transition-transform" />
                              <span>Helpful ({comment.likes})</span>
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
