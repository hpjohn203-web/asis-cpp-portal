import { useState } from 'react';
import { VIDEO_LIBRARY } from '../data/videos.js';

const totalVideos = VIDEO_LIBRARY.reduce((a, g) => a + g.videos.length, 0);

function getVideoKey(url) {
  return btoa(url).slice(0, 12);
}

export default function VideoLibrary({ onNavigate }) {
  const [search, setSearch] = useState('');
  const [activeGroup, setActiveGroup] = useState(null);
  const [watched, setWatched] = useState(() => JSON.parse(localStorage.getItem('cpp_watched_videos') || '{}'));

  function markWatched(url) {
    const key = getVideoKey(url);
    const next = { ...watched, [key]: true };
    setWatched(next);
    localStorage.setItem('cpp_watched_videos', JSON.stringify(next));
  }

  function openVideo(video) {
    markWatched(video.url);
    window.open(video.url, '_blank', 'noopener,noreferrer');
  }

  const filtered = VIDEO_LIBRARY.map(group => ({
    ...group,
    videos: group.videos.filter(v =>
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      group.group.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(g => g.videos.length > 0);

  const watchedCount = Object.keys(watched).length;

  return (
    <div className="px-4 py-6 lg:px-8 lg:py-8 max-w-5xl mx-auto">
      <button onClick={() => onNavigate('home')} className="lg:hidden flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 mb-4 transition-colors">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Dashboard
      </button>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold">Video Library</h1>
          <p className="text-sm text-slate-400 mt-0.5">{totalVideos} videos · <span className="text-emerald-400">{watchedCount} watched</span></p>
        </div>
        <p className="text-xs text-slate-500 hidden lg:block">Opens on YouTube ↗</p>
      </div>

      <div className="relative mb-4">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
        <input
          type="text"
          placeholder="Search topics or videos..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">✕</button>
        )}
      </div>

      <div className="flex gap-2 pb-3 mb-5 overflow-x-auto scrollbar-hide">
        <button onClick={() => setActiveGroup(null)}
          className={`shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${!activeGroup ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
          All
        </button>
        {VIDEO_LIBRARY.map(g => (
          <button key={g.group} onClick={() => setActiveGroup(g.group === activeGroup ? null : g.group)}
            className={`shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${activeGroup === g.group ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
            {g.group}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {filtered
          .filter(g => !activeGroup || g.group === activeGroup)
          .map(group => (
            <div key={group.group}>
              <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">{group.group} <span className="text-slate-600">({group.videos.length})</span></h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                {group.videos.map(video => {
                  const key = getVideoKey(video.url);
                  const isWatched = !!watched[key];
                  return (
                    <button
                      key={video.url}
                      onClick={() => openVideo(video)}
                      className={`flex items-center gap-3 border rounded-2xl p-3 text-left transition-colors active:scale-[0.98] group ${isWatched ? 'bg-emerald-500/5 border-emerald-500/30 hover:border-emerald-500/50' : 'bg-slate-800 border-slate-700 hover:border-amber-500/40'}`}
                    >
                      <div className="relative shrink-0 w-20 h-12 rounded-lg overflow-hidden bg-slate-700 flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center justify-center">
                          {isWatched
                            ? <div className="w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center"><span className="text-white text-sm font-bold">✓</span></div>
                            : <div className="w-7 h-7 bg-red-600 rounded-full flex items-center justify-center"><svg className="w-3.5 h-3.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></div>
                          }
                        </div>
                        <span className="text-slate-600 text-xs absolute bottom-1 right-1.5">▶ YT</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium line-clamp-2 transition-colors ${isWatched ? 'text-slate-400' : 'text-slate-200 group-hover:text-amber-300'}`}>{video.title}</p>
                        <p className={`text-xs mt-0.5 ${isWatched ? 'text-emerald-400' : 'text-amber-400'}`}>{isWatched ? '✓ Watched' : '▶ Open on YouTube'}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
