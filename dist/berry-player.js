export function bootstrapBerryWatchPage(options = {}) {
      const normalizedAssetBase = String(options.assetBase || '/berry-web-player').trim().replace(/\/+$/, '') || '/berry-web-player';
      const iconSpriteUrl = `${normalizedAssetBase}/icons.svg`;
      const config = {
        storageNamespace: String(options.storageNamespace || 'berry-web-player').trim() || 'berry-web-player',
        streamProviderHeader: String(options.streamProviderHeader || 'x-player-provider').trim() || 'x-player-provider',
        streamProviderValue: String(options.streamProviderValue || 'berry-web-player').trim() || 'berry-web-player',
        streamContextHeader: String(options.streamContextHeader || 'x-player-context').trim() || 'x-player-context',
        downloadPrefix: String(options.downloadPrefix || 'berry-web-player').trim() || 'berry-web-player'
      };
      const errorEl = document.getElementById('watchError');
      const playerShell = document.getElementById('mediaPlayer');
      const mediaControls = document.getElementById('mediaControls');
      const video = document.getElementById('mediaVideo');
      const mediaEmbedFrame = document.getElementById('mediaEmbedFrame');
      const animeTitleImageEl = document.getElementById('animeTitleImage');
      const episodeTitleEl = document.getElementById('episodeTitle');
      const episodeLabelEl = document.getElementById('episodeLabel');

      const playBtn = document.getElementById('playBtn');
      const muteBtn = document.getElementById('muteBtn');
      const nextBtn = document.getElementById('nextBtn');
      const captionsBtn = document.getElementById('captionsBtn');
      const settingsBtn = document.getElementById('settingsBtn');
      const episodesBtn = document.getElementById('episodesBtn');
      const screenshotBtn = document.getElementById('screenshotBtn');
      const clipBtn = document.getElementById('clipBtn');
      const castBtn = document.getElementById('castBtn');
      const pipBtn = document.getElementById('pipBtn');
      const fullscreenBtn = document.getElementById('fullscreenBtn');

      const currentTimeText = document.getElementById('currentTimeText');
      const durationText = document.getElementById('durationText');

      const timeSlider = document.getElementById('timeSlider');
      const timeSliderProgress = document.getElementById('timeSliderProgress');
      const timeSliderFill = document.getElementById('timeSliderFill');
      const timeSliderPreview = document.getElementById('timeSliderPreview');
      const timeSliderPreviewImage = document.getElementById('timeSliderPreviewImage');
      const timeSliderPreviewValue = document.getElementById('timeSliderPreviewValue');

      const volumeSlider = document.getElementById('volumeSlider');
      const volumeSliderFill = document.getElementById('volumeSliderFill');
      const volumeWrap = document.querySelector('.media-volume-wrap');

      const episodesPopover = document.getElementById('episodesPopover');
      const episodesPopoverSeason = document.getElementById('episodesPopoverSeason');
      const episodesPopoverCount = document.getElementById('episodesPopoverCount');
      const episodesPopoverList = document.getElementById('episodesPopoverList');

      const settingsPopover = document.getElementById('settingsPopover');
      const settingsMenuMain = document.getElementById('settingsMenuMain');
      const settingsMenuSub = document.getElementById('settingsMenuSub');
      const settingsMainAutoplayRow = document.getElementById('settingsMainAutoplayRow');
      const settingsAutoplayToggle = document.getElementById('settingsAutoplayToggle');
      const settingsMainAudioBtn = document.getElementById('settingsMainAudioBtn');
      const settingsMainQualityBtn = document.getElementById('settingsMainQualityBtn');
      const settingsMainSubtitleBtn = document.getElementById('settingsMainSubtitleBtn');
      const settingsMainAudioValue = document.getElementById('settingsMainAudioValue');
      const settingsMainQualityValue = document.getElementById('settingsMainQualityValue');
      const settingsMainSubtitleValue = document.getElementById('settingsMainSubtitleValue');
      const settingsBackBtn = document.getElementById('settingsBackBtn');
      const settingsSubTitle = document.getElementById('settingsSubTitle');
      const settingsSubList = document.getElementById('settingsSubList');
      const commentsBtn = document.getElementById('commentsBtn');
      const commentsCountBadge = document.getElementById('commentsCountBadge');
      const commentsPanelBackdrop = document.getElementById('commentsPanelBackdrop');
      const commentsPanel = document.getElementById('commentsPanel');
      const commentsPanelCount = document.getElementById('commentsPanelCount');
      const commentsCloseBtn = document.getElementById('commentsCloseBtn');
      const commentsPanelList = document.getElementById('commentsPanelList');
      const commentsForm = document.getElementById('commentsForm');
      const commentsCharCount = document.getElementById('commentsCharCount');
      const commentsInput = document.getElementById('commentsInput');
      const commentsFormError = document.getElementById('commentsFormError');
      const clipModalBackdrop = document.getElementById('clipModalBackdrop');
      const clipModal = document.getElementById('clipModal');
      const clipModalCloseBtn = document.getElementById('clipModalCloseBtn');
      const clipModalCancelBtn = document.getElementById('clipModalCancelBtn');
      const clipPreviewVideo = document.getElementById('clipPreviewVideo');
      const clipPreviewStatus = document.getElementById('clipPreviewStatus');
      const clipStartLabel = document.getElementById('clipStartLabel');
      const clipEndLabel = document.getElementById('clipEndLabel');
      const clipDurationLabel = document.getElementById('clipDurationLabel');
      const clipRangeFill = document.getElementById('clipRangeFill');
      const clipStartRange = document.getElementById('clipStartRange');
      const clipEndRange = document.getElementById('clipEndRange');
      const clipStartOutput = document.getElementById('clipStartOutput');
      const clipEndOutput = document.getElementById('clipEndOutput');
      const clipStartHours = document.getElementById('clipStartHours');
      const clipStartMinutes = document.getElementById('clipStartMinutes');
      const clipStartSeconds = document.getElementById('clipStartSeconds');
      const clipStartMillis = document.getElementById('clipStartMillis');
      const clipEndHours = document.getElementById('clipEndHours');
      const clipEndMinutes = document.getElementById('clipEndMinutes');
      const clipEndSeconds = document.getElementById('clipEndSeconds');
      const clipEndMillis = document.getElementById('clipEndMillis');
      const clipPreviewPlayBtn = document.getElementById('clipPreviewPlayBtn');
      const clipExportBtn = document.getElementById('clipExportBtn');
      const clipModalError = document.getElementById('clipModalError');
      const watchSkipToast = document.getElementById('watchSkipToast');
      const watchSkipToastTitle = document.getElementById('watchSkipToastTitle');
      const watchSkipToastBtn = document.getElementById('watchSkipToastBtn');
      const watchNextToast = document.getElementById('watchNextToast');
      const watchNextToastTitle = document.getElementById('watchNextToastTitle');
      const watchNextToastBtn = document.getElementById('watchNextToastBtn');
      const watchPage = document.getElementById('watchPage');
      const watchEndcard = document.getElementById('watchEndcard');
      const watchEndcardBackgrounds = document.getElementById('watchEndcardBackgrounds');
      const watchEndcardEyebrow = document.getElementById('watchEndcardEyebrow');
      const watchEndcardAnimeTitle = document.getElementById('watchEndcardAnimeTitle');
      const watchEndcardMeta = document.getElementById('watchEndcardMeta');
      const watchEndcardDescription = document.getElementById('watchEndcardDescription');
      const watchEndcardPrimaryLink = document.getElementById('watchEndcardPrimaryLink');
      const watchEndcardReplayBtn = document.getElementById('watchEndcardReplayBtn');
      const watchEndcardRatingButtons = Array.from(document.querySelectorAll('.watch-endcard__reaction[data-rating-value]'));
      const WATCH_REACTION_ICON = `<svg viewBox="0 0 60 60" fill="none" aria-hidden="true" focusable="false"><use href="${iconSpriteUrl}#reaction"></use></svg>`;

      if (!errorEl || !playerShell || !mediaControls || !video) {
        throw new Error('Berry web player shell não foi montado antes do bootstrap.');
      }

      const state = {
        hls: null,
        streamUrl: null,
        streamType: null,
        streamProvider: null,
        externalEmbedMode: false,
        externalEmbedUrl: null,
        streamProviderHeader: config.streamProviderHeader,
        streamProviderValue: config.streamProviderValue,
        streamContextHeader: config.streamContextHeader,
        streamContextToken: null,
        currentVideoId: null,
        bloggerFallbackUrl: null,
        bloggerFallbackAttempted: false,
        streamBootstrapGeneration: 0,
        streamStartupTimeoutId: null,
        streamStartupResolved: false,
        hlsFatalNetworkErrors: 0,
        hlsFatalMediaErrors: 0,

        currentSeasonToken: null,
        currentEpisodeToken: null,
        currentEpisodeRouteToken: null,
        currentSeasonNumber: 1,
        allEpisodes: [],
        navigationNext: null,
        navigationPrev: null,

        animeId: null,
        animeSlug: null,
        animeName: null,
        episodeId: null,
        episodeTitle: null,
        episodeNumber: null,
        animeCoverUrl: null,
        animeTitleImageUrl: null,
        temporada: 1,
        duration: 0,
        currentTime: 0,
        lastSavedTime: 0,
        hasSentComplete: false,
        minDelta: 5,
        pendingPlaybackRestore: null,
        pendingPlaybackRestoreTimer: null,
        forcePlaybackOnLoad: false,
        skipData: null,
        skipPromptVisible: false,
        skipCurrentType: null,
        skipAutoApplied: {
          intro: false,
          recap: false,
          credits: false,
          preview: false
        },
        nextPromptVisible: false,
        nextPromptTimer: null,
        nextPromptShownForUiSession: false,
        endcardVisible: false,
        endcardBackgroundTimer: null,
        endcardBackgroundIndex: 0,
        endcardHeroItems: [],
        currentAnimeRating: null,
        animeRatingCounts: { odiei: 0, gostei: 0, amei: 0 },
        animeRatingTotal: 0,
        endcardRecommendations: [],
        clipAllowed: false,
        clipMaxDurationMs: 5 * 60 * 1000,
        clipModalOpen: false,
        clipExportInFlight: false,
        clipPreviewHls: null,
        clipPreviewReady: false,
        clipPreviewResumeOnClose: false,
        clipStartMs: 0,
        clipEndMs: 0,
        commentsPanelOpen: false,
        commentsLoading: false,
        commentsSubmitting: false,
        commentsCount: 0,
        commentsItems: [],
        commentsCanPost: false,
        commentsViewer: null,
        commentsLoadedEpisodeId: null,

        sliderDrag: false,
        volumeDrag: false,
        userPrefs: {
          audioLang: null,
          subtitleLang: null,
          preferDub: false,
          autoSkipIntro: false,
          autoplay: false
        },

        thumbnailCues: [],
        thumbnailSeq: 0,
        thumbnailPrimeCache: new Set(),
        assRenderer: null,
        assSubtitleUrl: null,
        assSubtitleMeta: null,
        assSubtitleSource: null,
        assSubtitleCandidates: [],
        assSubtitleEnabled: false,
        assRendererFailed: false,
        assRendererDisabled: false,
        assCspBlocked: false,
        assFallbackTrackEl: null,
        assFallbackTrackObjectUrl: null,
        assFallbackOptionId: null,
        assInitRetryPending: false,
        assInitInFlight: false,
        assLastError: null,
        assRendererTrackFailures: new Map(),
        assFallbackVttCache: new Map(),
        assSubtitleContentCache: new Map(),
        hlsAssSubtitleCache: new Map(),
        hlsSubtitleSyncTimers: [],
        hlsSubtitleSyncGeneration: 0,
        hlsManifestSubtitleTracks: [],
        hlsManifestSubtitleUrl: '',
        pendingHlsSubtitleTargetIndex: null,
        manualHlsSubtitleIndex: null,
        assAutoAttachPending: false,
        assAutoAttachLastKey: '',
        assAutoAttachLastAt: 0,
        activeSubtitleOptionId: null,
        subtitleSelectionEpoch: 0,
        subtitleCatalog: [],
        subtitleCatalogVersion: 0,
        subtitleInitialSelectionApplied: false,
        subtitleRuntimeTrackId: null,
        subtitleRuntimeMode: 'off',
        subtitleStyleTrackId: null,
        subtitleReconcileTimer: null,
        subtitleExclusions: [],
        subtitleLiftActive: false,
        subtitleOffsetPx: 0,
        controlsVisible: true,

        episodesPopoverOpen: false,
        settingsPopoverOpen: false,
        settingsView: 'main',
        qualityPreference: 'auto'
      };

      const WATCH_NAV_ACTIVATION_KEY = `${config.storageNamespace}_watch_nav_activation_v1`;
      const WATCH_SUBTITLE_TRACK_PREF_KEY_PREFIX = `${config.storageNamespace}_watch_subtitle_track_pref_v1`;

      function buildCurrentSubtitleTrackPreferenceScope() {
        const episodeId = Number(state.episodeId || 0);
        if (!Number.isFinite(episodeId) || episodeId <= 0) return '';
        const videoId = String(state.currentVideoId || '').trim().toLowerCase();
        return videoId ? `${episodeId}:${videoId}` : `${episodeId}`;
      }

      function buildCurrentSubtitleTrackPreferenceStorageKey() {
        const scope = buildCurrentSubtitleTrackPreferenceScope();
        if (!scope) return '';
        return `${WATCH_SUBTITLE_TRACK_PREF_KEY_PREFIX}:${scope}`;
      }

      function readStoredSubtitleTrackPreference() {
        const storageKey = buildCurrentSubtitleTrackPreferenceStorageKey();
        if (!storageKey) return null;
        try {
          const raw = localStorage.getItem(storageKey);
          if (!raw) return null;
          const parsed = JSON.parse(raw);
          return parsed && typeof parsed === 'object' ? parsed : null;
        } catch {
          return null;
        }
      }

      const ASS_ASSETS_BASE = '/subtitles/original';
      const ASS_ASSET_VERSION = '20260318-assfix51';
      const USE_CANONICAL_SUBTITLE_CONTROLLER = true;
      const watchDebugState = (window.__watchState && typeof window.__watchState === 'object')
        ? window.__watchState
        : {};
      window.__watchState = watchDebugState;
      const syncWatchDebugState = () => {
        watchDebugState.assFallbackOptionId = state.assFallbackOptionId || null;
        watchDebugState.activeSubtitleOptionId = state.activeSubtitleOptionId || null;
        watchDebugState.currentVideoId = state.currentVideoId || null;
        watchDebugState.manualHlsSubtitleIndex =
          Number.isInteger(Number(state.manualHlsSubtitleIndex)) && Number(state.manualHlsSubtitleIndex) >= 0
            ? Number(state.manualHlsSubtitleIndex)
            : null;
        watchDebugState.pendingHlsSubtitleTargetIndex =
          Number.isInteger(Number(state.pendingHlsSubtitleTargetIndex)) && Number(state.pendingHlsSubtitleTargetIndex) >= 0
            ? Number(state.pendingHlsSubtitleTargetIndex)
            : null;
        watchDebugState.hls = {
          subtitleTrack:
            Number.isInteger(Number(state.hls?.subtitleTrack))
              ? Number(state.hls.subtitleTrack)
              : null,
          manifestTrackCount: Array.isArray(state.hlsManifestSubtitleTracks)
            ? state.hlsManifestSubtitleTracks.length
            : 0
        };
        watchDebugState.subtitleRuntimeTrackId = state.subtitleRuntimeTrackId || null;
        watchDebugState.subtitleRuntimeMode = String(state.subtitleRuntimeMode || 'off');
        watchDebugState.assSubtitleUrl = state.assSubtitleUrl || null;
        watchDebugState.assSubtitleCandidates = Array.isArray(state.assSubtitleCandidates)
          ? state.assSubtitleCandidates.slice()
          : [];
        watchDebugState.subtitleCatalogIds = Array.isArray(state.subtitleCatalog)
          ? state.subtitleCatalog.map((track) => String(track?.id || '')).filter(Boolean)
          : [];
        watchDebugState.subtitleCatalogKeys = Array.isArray(state.subtitleCatalog)
          ? state.subtitleCatalog.map((track) => String(track?.catalogKey || '')).filter(Boolean)
          : [];
        watchDebugState.subtitleStoredTrackPreference = readStoredSubtitleTrackPreference();
        watchDebugState.assRendererTrackFailures = state.assRendererTrackFailures instanceof Map
          ? Array.from(state.assRendererTrackFailures.keys())
          : [];
      };
      syncWatchDebugState();
      const withAssAssetVersion = (assetUrl) => {
        const value = String(assetUrl || '').trim();
        if (!value) return value;
        const hashIndex = value.indexOf('#');
        const base = hashIndex >= 0 ? value.slice(0, hashIndex) : value;
        const hash = hashIndex >= 0 ? value.slice(hashIndex) : '';
        const joiner = base.includes('?') ? '&' : '?';
        return `${base}${joiner}v=${encodeURIComponent(ASS_ASSET_VERSION)}${hash}`;
      };
      const ASS_PLAYER_PATCH_VERSION = ASS_ASSET_VERSION;
      if (playerShell) {
        playerShell.dataset.assPatchVersion = ASS_PLAYER_PATCH_VERSION;
        playerShell.dataset.assSubtitles = 'off';
        playerShell.dataset.assRendererDisabled = '0';
      }
      // Em ambiente real com Rocket Loader/CSP/Worker instável, o renderer WASM
      // causa falhas intermitentes e flicker. Mantemos fallback ASS->VTT estável.
      const ASS_RENDERER_FORCE_FALLBACK = false;
      const ASS_WASM_SUPPORTED = (() => {
        try {
          if (typeof WebAssembly !== 'object' || typeof WebAssembly.instantiate !== 'function') return false;
          const probe = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0]);
          const module = new WebAssembly.Module(probe);
          if (!(module instanceof WebAssembly.Module)) return false;
          const instance = new WebAssembly.Instance(module);
          return instance instanceof WebAssembly.Instance;
        } catch (_) {
          return false;
        }
      })();
      const cueLayoutCache = new WeakMap();
      let subtitleLiftTimer = null;
      let titleImageDockTimer = null;
      let lastSettingsOptionPointerSelectionAt = 0;
      let controlsPointerInside = false;

      const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
      const clampResumeRestoreTime = (value, duration = 0) => {
        const parsed = Math.max(0, Math.floor(Number(value) || 0));
        const total = Math.max(0, Math.floor(Number(duration) || 0));
        if (total > 5) {
          return Math.min(parsed, Math.max(0, total - 5));
        }
        return parsed;
      };

      const playVideoSafe = async () => {
        try {
          await Promise.resolve(video.play());
          return true;
        } catch {
          return false;
        }
      };

      const queuePendingPlaybackRestoreRetry = () => {
        if (state.pendingPlaybackRestoreTimer) {
          window.clearTimeout(state.pendingPlaybackRestoreTimer);
        }
        state.pendingPlaybackRestoreTimer = window.setTimeout(() => {
          state.pendingPlaybackRestoreTimer = null;
          consumePendingPlaybackRestore();
        }, 220);
      };

      const schedulePlaybackRestore = (time, shouldResume = false) => {
        if (state.externalEmbedMode) return;
        const target = clampResumeRestoreTime(time, Number(video.duration || state.duration || 0));
        if (!(target > 0)) {
          state.pendingPlaybackRestore = null;
          if (state.pendingPlaybackRestoreTimer) {
            window.clearTimeout(state.pendingPlaybackRestoreTimer);
            state.pendingPlaybackRestoreTimer = null;
          }
          return;
        }

        state.pendingPlaybackRestore = {
          time: target,
          shouldResume: !!shouldResume,
          attempts: 0
        };
        queuePendingPlaybackRestoreRetry();
      };

      async function consumePendingPlaybackRestore() {
        const restore = state.pendingPlaybackRestore;
        if (!restore) return;

        if ((restore.attempts || 0) >= 16) {
          state.pendingPlaybackRestore = null;
          return;
        }

        const duration = Number(video.duration || state.duration || 0);
        const target = clampResumeRestoreTime(restore.time, duration);
        if (!(target > 0)) {
          state.pendingPlaybackRestore = null;
          return;
        }

        const seekableReady =
          (Number.isFinite(duration) && duration > 0) ||
          (video.seekable && video.seekable.length > 0);

        restore.attempts = (restore.attempts || 0) + 1;

        if (!seekableReady) {
          queuePendingPlaybackRestoreRetry();
          return;
        }

        try {
          video.currentTime = target;
        } catch (_) {}

        const current = Number(video.currentTime || 0);
        const applied =
          Math.abs(current - target) <= 1.5 ||
          current >= Math.max(1, target - 1.5);

        if (!applied) {
          queuePendingPlaybackRestoreRetry();
          return;
        }

        state.pendingPlaybackRestore = null;
        state.currentTime = current || target;
        state.lastSavedTime = Math.max(state.lastSavedTime, Math.floor(current || target));

        if (restore.shouldResume && video.paused) {
          await playVideoSafe();
        }
      }

      const parseResumeSecondsFromSearch = () => {
        const params = new URLSearchParams(window.location.search || '');
        for (const key of ['t', 'resume', 'start']) {
          const rawValue = params.get(key);
          if (!rawValue) continue;
          const parsed = Number(String(rawValue).replace(',', '.'));
          if (Number.isFinite(parsed) && parsed >= 0) {
            return Math.floor(parsed);
          }
        }
        return 0;
      };

      const consumeWatchNavigationIntentResume = () => {
        try {
          const raw = sessionStorage.getItem(WATCH_NAV_ACTIVATION_KEY);
          if (!raw) return 0;
          const payload = JSON.parse(raw);
          if (!payload || typeof payload !== 'object') {
            sessionStorage.removeItem(WATCH_NAV_ACTIVATION_KEY);
            return 0;
          }

          const ts = Number(payload.ts || 0);
          if (!ts || Date.now() - ts > 15 * 60 * 1000) {
            sessionStorage.removeItem(WATCH_NAV_ACTIVATION_KEY);
            return 0;
          }

          const targetUrl = new URL(String(payload.target || ''), window.location.origin);
          if (targetUrl.pathname !== window.location.pathname) {
            return 0;
          }

          sessionStorage.removeItem(WATCH_NAV_ACTIVATION_KEY);
          return clampResumeRestoreTime(payload.resumeSeconds || 0);
        } catch (_) {
          try {
            sessionStorage.removeItem(WATCH_NAV_ACTIVATION_KEY);
          } catch (_) {}
          return 0;
        }
      };

      const nextSubtitleSelectionEpoch = () => {
        const next = Number(state.subtitleSelectionEpoch || 0) + 1;
        state.subtitleSelectionEpoch = next;
        return next;
      };
      const buildAssRendererTrackFailureKey = (subtitleUrl = '') => {
        const safeUrl = normalizeAssSubtitleFetchUrl(subtitleUrl || '') || toAbsoluteAssetUrl(subtitleUrl || '');
        return safeUrl ? String(safeUrl) : '';
      };
      const hasAssRendererTrackFailure = (subtitleUrl = '') => {
        const failureKey = buildAssRendererTrackFailureKey(subtitleUrl);
        if (!failureKey || !(state.assRendererTrackFailures instanceof Map)) return false;
        return state.assRendererTrackFailures.has(failureKey);
      };
      const getAssRendererTrackFailureReason = (subtitleUrl = '') => {
        const failureKey = buildAssRendererTrackFailureKey(subtitleUrl);
        if (!failureKey || !(state.assRendererTrackFailures instanceof Map)) return null;
        return state.assRendererTrackFailures.get(failureKey) || null;
      };
      const rememberAssRendererTrackFailure = (subtitleUrl = '', reason = '') => {
        const failureKey = buildAssRendererTrackFailureKey(subtitleUrl);
        if (!failureKey) return null;
        if (!(state.assRendererTrackFailures instanceof Map)) {
          state.assRendererTrackFailures = new Map();
        }
        state.assRendererTrackFailures.set(failureKey, String(reason || 'ass_renderer_runtime_failure'));
        syncWatchDebugState();
        return failureKey;
      };
      const clearAssRendererTrackFailure = (subtitleUrl = '') => {
        const failureKey = buildAssRendererTrackFailureKey(subtitleUrl);
        if (!failureKey || !(state.assRendererTrackFailures instanceof Map)) return;
        state.assRendererTrackFailures.delete(failureKey);
        syncWatchDebugState();
      };
      const clearSubtitleReconcileTimer = () => {
        if (!state.subtitleReconcileTimer) return;
        clearTimeout(state.subtitleReconcileTimer);
        state.subtitleReconcileTimer = null;
      };
      const isSubtitleSelectionEpochCurrent = (epoch) => {
        return Number(epoch) === Number(state.subtitleSelectionEpoch || 0);
      };
      const escapeHtml = (value = '') => String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

      const COMMENTS_MAX_LENGTH = 300;

      const formatCommentTimestamp = (value) => {
        if (!value) return '';
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return '';
        try {
          return new Intl.DateTimeFormat(
            document.documentElement.lang || navigator.language || 'pt-BR',
            {
              day: '2-digit',
              month: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            }
          ).format(date);
        } catch (_) {
          return date.toLocaleString();
        }
      };

      const buildCommentAvatarMarkup = (name = '', avatarUrl = '') => {
        const normalizedName = String(name || 'U').trim() || 'U';
        const initial = escapeHtml(normalizedName.charAt(0).toUpperCase());
        const safeAvatarUrl = String(avatarUrl || '').trim();
        if (safeAvatarUrl) {
          return `<div class="comments-panel__avatar" style="background-image:url('${escapeHtml(safeAvatarUrl)}');background-size:cover;background-position:center;" aria-hidden="true"></div>`;
        }
        return `<div class="comments-panel__avatar" aria-hidden="true">${initial}</div>`;
      };

      const setCommentsFormError = (message = '') => {
        if (!commentsFormError) return;
        const text = String(message || '').trim();
        commentsFormError.textContent = text;
        commentsFormError.hidden = !text;
      };

      const renderCommentsBadge = () => {
        if (!commentsCountBadge) return;
        const total = Math.max(0, Number(state.commentsCount || 0));
        commentsCountBadge.textContent = total > 99 ? '99+' : String(total);
        commentsCountBadge.hidden = total <= 0;
      };

      const updateCommentsCharCount = () => {
        const content = String(commentsInput?.value || '');
        const length = content.length;
        if (commentsCharCount) {
          commentsCharCount.textContent = `${Math.min(length, COMMENTS_MAX_LENGTH)}/${COMMENTS_MAX_LENGTH}`;
        }
        if (commentsInput) {
          commentsInput.maxLength = COMMENTS_MAX_LENGTH;
          commentsInput.disabled = !state.commentsCanPost || state.commentsSubmitting;
        }
      };

      const renderCommentsPanel = () => {
        const count = Math.max(0, Number(state.commentsCount || 0));
        if (commentsPanelCount) {
          commentsPanelCount.textContent = `${count} ${count === 1 ? 'comentário' : 'comentários'}`;
        }

        if (commentsInput) {
          commentsInput.placeholder = state.commentsCanPost
            ? 'Escreva um comentário sobre este episódio...'
            : 'Ative um perfil válido para comentar.';
        }

        if (!commentsPanelList) {
          updateCommentsCharCount();
          return;
        }

        if (state.commentsLoading) {
          commentsPanelList.innerHTML = '<div class="comments-panel__loading">Carregando comentários…</div>';
          updateCommentsCharCount();
          return;
        }

        if (!Array.isArray(state.commentsItems) || !state.commentsItems.length) {
          commentsPanelList.innerHTML = '<div class="comments-panel__empty">Ainda não há comentários neste episódio.</div>';
          updateCommentsCharCount();
          return;
        }

        commentsPanelList.innerHTML = state.commentsItems.map((item) => {
          const authorName = String(item?.authorName || 'Usuário').trim() || 'Usuário';
          const safeContent = escapeHtml(item?.content || '').replace(/\n/g, '<br>');
          const timestamp = formatCommentTimestamp(item?.createdAt);
          return `
            <article class="comments-panel__item" data-comment-id="${Number(item?.id || 0)}">
              ${buildCommentAvatarMarkup(authorName, item?.avatarUrl || '')}
              <div class="comments-panel__bubble">
                <div class="comments-panel__meta">
                  <span class="comments-panel__author">${escapeHtml(authorName)}</span>
                  ${item?.isOwn ? '<span class="comments-panel__own-tag">Você</span>' : ''}
                  ${timestamp ? `<span>${escapeHtml(timestamp)}</span>` : ''}
                </div>
                <div class="comments-panel__content">${safeContent}</div>
              </div>
            </article>
          `;
        }).join('');

        updateCommentsCharCount();
      };

      const scrollCommentsToBottom = () => {
        if (!commentsPanelList) return;
        commentsPanelList.scrollTop = commentsPanelList.scrollHeight;
      };

      const getEpisodeCommentsApiUrl = () => {
        if (!state.currentSeasonToken || !state.currentEpisodeRouteToken) return '';
        return `/api/watch/${encodeURIComponent(state.currentSeasonToken)}/${encodeURIComponent(state.currentEpisodeRouteToken)}/comments`;
      };

      const loadEpisodeComments = async ({ force = false } = {}) => {
        if (!state.episodeId) return;
        if (!force && state.commentsLoadedEpisodeId === state.episodeId && Array.isArray(state.commentsItems) && state.commentsItems.length >= 0) {
          renderCommentsPanel();
          return;
        }

        const url = getEpisodeCommentsApiUrl();
        if (!url) return;

        state.commentsLoading = true;
        renderCommentsPanel();
        setCommentsFormError('');

        try {
          const response = await fetch(url, {
            credentials: 'same-origin',
            cache: 'no-store'
          });
          const payload = await response.json().catch(() => ({}));
          if (!response.ok || payload?.error) {
            throw new Error(payload?.error || 'Não foi possível carregar os comentários.');
          }

          state.commentsItems = Array.isArray(payload?.items) ? payload.items : [];
          state.commentsCount = Math.max(0, Number(payload?.count || state.commentsItems.length || 0));
          state.commentsCanPost = !!payload?.canComment;
          state.commentsViewer = payload?.viewer || null;
          state.commentsLoadedEpisodeId = state.episodeId;
          renderCommentsBadge();
        } catch (error) {
          setCommentsFormError(error?.message || 'Não foi possível carregar os comentários.');
        } finally {
          state.commentsLoading = false;
          renderCommentsPanel();
          if (state.commentsPanelOpen) {
            scrollCommentsToBottom();
          }
        }
      };

      const submitEpisodeComment = async () => {
        if (state.commentsSubmitting) return;
        if (!state.commentsCanPost) {
          setCommentsFormError('Seu perfil ativo não pode comentar agora.');
          return;
        }

        const content = String(commentsInput?.value || '').trim();
        if (!content) {
          setCommentsFormError('Escreva um comentário antes de enviar.');
          return;
        }
        if (content.length > COMMENTS_MAX_LENGTH) {
          setCommentsFormError(`O comentário pode ter no máximo ${COMMENTS_MAX_LENGTH} caracteres.`);
          return;
        }

        const url = getEpisodeCommentsApiUrl();
        if (!url) return;

        state.commentsSubmitting = true;
        updateCommentsCharCount();
        setCommentsFormError('');

        try {
          const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
          });
          const payload = await response.json().catch(() => ({}));
          if (!response.ok || payload?.error) {
            throw new Error(payload?.error || 'Não foi possível publicar o comentário.');
          }

          if (payload?.item) {
            state.commentsItems = [...state.commentsItems, payload.item];
          } else {
            await loadEpisodeComments({ force: true });
          }
          state.commentsCount = Math.max(0, Number(payload?.count || state.commentsItems.length || 0));
          renderCommentsBadge();
          commentsInput.value = '';
          renderCommentsPanel();
          scrollCommentsToBottom();
        } catch (error) {
          setCommentsFormError(error?.message || 'Não foi possível publicar o comentário.');
        } finally {
          state.commentsSubmitting = false;
          updateCommentsCharCount();
        }
      };

      const setCommentsPanelOpen = async (open) => {
        const shouldOpen = !!open;
        if (shouldOpen === state.commentsPanelOpen) {
          if (shouldOpen) {
            await loadEpisodeComments();
          }
          return;
        }

        if (shouldOpen && state.clipModalOpen) {
          await closeClipModal({ restorePlayback: false });
        }

        state.commentsPanelOpen = shouldOpen;
        commentsPanelBackdrop?.setAttribute('data-open', shouldOpen ? 'true' : 'false');
        commentsPanelBackdrop?.setAttribute('aria-hidden', shouldOpen ? 'false' : 'true');

        if (shouldOpen) {
          setEpisodesPopoverOpen(false);
          setSettingsPopoverOpen(false);
          hideSkipPrompt();
          setControlsVisible(true);
          clearSubtitleLiftTimer();
          renderCommentsPanel();
          await loadEpisodeComments({
            force: state.commentsLoadedEpisodeId !== state.episodeId
          });
          requestAnimationFrame(() => {
            if (state.commentsCanPost && commentsInput && !commentsInput.disabled) {
              commentsInput.focus();
            } else {
              commentsCloseBtn?.focus();
            }
            scrollCommentsToBottom();
          });
          return;
        }

        setCommentsFormError('');
        updateCommentsCharCount();
        updateSkipPrompt();
        if (!shouldKeepUiVisible()) {
          scheduleSubtitleLiftDown(260);
        }
      };

      const showLoading = (msg = 'Carregando player...') => {
        setBuffering(false);
        errorEl.classList.add('hidden');
        hideSkipPrompt();
        hideNextEpisodePrompt();
        hideWatchEndcard();
      };

      const hideLoading = () => {};

      const showError = (msg) => {
        hideLoading();
        setBuffering(false);
        hideSkipPrompt();
        errorEl.textContent = msg || 'Erro ao carregar episódio.';
        errorEl.classList.remove('hidden');
      };

      const showBootstrapBuffering = () => {
        errorEl.classList.add('hidden');
        hideSkipPrompt();
        hideNextEpisodePrompt();
        hideWatchEndcard();
        setBuffering(true);
      };

      const clearStreamStartupTimeout = () => {
        if (state.streamStartupTimeoutId) {
          clearTimeout(state.streamStartupTimeoutId);
          state.streamStartupTimeoutId = null;
        }
      };

      const markStreamStartupSuccess = () => {
        state.streamStartupResolved = true;
        clearStreamStartupTimeout();
        hideLoading();
      };

      const setBuffering = (value) => {
        playerShell.dataset.buffering = value ? 'true' : 'false';
      };

      const formatTime = (seconds = 0) => {
        const total = Math.max(0, Math.floor(Number(seconds) || 0));
        const h = Math.floor(total / 3600);
        const m = Math.floor((total % 3600) / 60);
        const s = total % 60;
        if (h > 0) {
          return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        }
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
      };

      const cleanEpisodeTitle = (title) => {
        if (!title) return 'BerryAnimes';
        return String(title)
          .replace(/\s*\d+x\d+\s*$/i, '')
          .replace(/\s*S\d+E\d+\s*$/i, '')
          .replace(/\s*-\s*Episódio\s+\d+\s*$/i, '')
          .replace(/\s*Episódio\s+\d+\s*$/i, '')
          .replace(/\s*Ep\.\s*\d+\s*$/i, '')
          .replace(/\s*#\d+\s*$/i, '')
          .trim();
      };

      const toAbsoluteAssetUrl = (value = '') => {
        const raw = String(value || '').trim();
        if (!raw) return null;
        try {
          return new URL(raw, window.location.origin).toString();
        } catch {
          return null;
        }
      };

      // URLs ASS vindas do HLS podem herdar tokens/referências de subplaylist (u/st)
      // e acabar apontando para .m3u8 em vez do .ass real no backend.
      const normalizeAssSubtitleFetchUrl = (value = '') => {
        const absolute = toAbsoluteAssetUrl(value || '');
        if (!absolute) return null;
        try {
          const parsed = new URL(absolute);
          const pathname = String(parsed.pathname || '');
          const isAssLike = /\.(ass|ssa)$/i.test(pathname);
          if (!isAssLike) return parsed.toString();
          if (pathname.toLowerCase().startsWith('/api/videoapi/stream/')) {
            parsed.searchParams.delete('u');
            parsed.searchParams.delete('st');
            parsed.searchParams.delete('p');
            parsed.searchParams.delete('subpath');
          }
          return parsed.toString();
        } catch {
          return absolute;
        }
      };

      const isSameOriginAssetUrl = (value = '') => {
        const absolute = toAbsoluteAssetUrl(value || '');
        if (!absolute) return false;
        try {
          return new URL(absolute).origin === window.location.origin;
        } catch {
          return false;
        }
      };

      const isTrustedSubtitleAssetUrl = (value = '') => {
        const absolute = normalizeAssSubtitleFetchUrl(value || '') || toAbsoluteAssetUrl(value || '');
        if (!absolute || !isSameOriginAssetUrl(absolute)) return false;
        try {
          const pathname = String(new URL(absolute).pathname || '').toLowerCase();
          const isAllowedPath =
            pathname.startsWith('/uploads/subtitles/') ||
            pathname.startsWith('/subtitles/') ||
            pathname.startsWith('/api/videoapi/stream/');
          if (!isAllowedPath) return false;
          return /\.(ass|ssa|vtt|srt)$/i.test(pathname);
        } catch {
          return false;
        }
      };

      const buildSubtitleCacheToken = (value = '') => {
        const raw = String(value || '').trim();
        if (!raw) return '';
        const timestamp = Date.parse(raw);
        if (Number.isFinite(timestamp) && timestamp > 0) {
          return String(timestamp);
        }
        const compact = raw.replace(/[^a-z0-9]/gi, '').toLowerCase();
        return compact.slice(0, 32);
      };

      const withSubtitleCacheToken = (url = '', token = '') => {
        const absolute = normalizeAssSubtitleFetchUrl(url || '') || toAbsoluteAssetUrl(url || '');
        const safeToken = String(token || '').trim();
        if (!absolute || !safeToken) return absolute;
        try {
          const parsed = new URL(absolute);
          parsed.searchParams.set('sv', safeToken);
          return parsed.toString();
        } catch {
          return absolute;
        }
      };

      const resolveEpisodeName = (episode = {}, fallbackIndex = 0) => {
        const explicit = String(
          episode?.episode_title ||
          episode?.nome ||
          ''
        ).trim();
        if (explicit) return explicit;
        const number = episode?.numero || fallbackIndex + 1;
        return `Episódio ${number}`;
      };

      const resolveEpisodeDescription = (episode = {}) => {
        const explicit = String(
          episode?.sinopse ||
          episode?.descricao ||
          ''
        ).trim();
        return explicit || 'Sem descrição disponível.';
      };

      const resolveEpisodeThumb = (episode = {}) => {
        const fromEpisode = toAbsoluteAssetUrl(
          episode?.thumbnail_url ||
          episode?.thumbnail ||
          episode?.image ||
          episode?.imagem ||
          ''
        );
        if (fromEpisode) return fromEpisode;
        return (
          toAbsoluteAssetUrl(state.animeCoverUrl) ||
          toAbsoluteAssetUrl(state.animeTitleImageUrl) ||
          '/images/default-cover.jpg'
        );
      };

      const applyHeaderTitle = ({ title, episodeNumber, titleImageUrl }) => {
        const fallbackTitle = cleanEpisodeTitle(title || 'BerryAnimes');
        episodeTitleEl.textContent = fallbackTitle;
        episodeLabelEl.textContent = episodeNumber ? `Episódio ${episodeNumber}` : 'Episódio';

        const imageUrl = toAbsoluteAssetUrl(titleImageUrl || '');
        if (imageUrl) {
          animeTitleImageEl.src = imageUrl;
          animeTitleImageEl.classList.remove('is-hidden');
          episodeTitleEl.classList.add('is-hidden');
        } else {
          animeTitleImageEl.removeAttribute('src');
          animeTitleImageEl.classList.add('is-hidden');
          episodeTitleEl.classList.remove('is-hidden');
        }
        syncHeaderTitleState();
      };

      animeTitleImageEl.addEventListener('error', () => {
        animeTitleImageEl.classList.add('is-hidden');
        episodeTitleEl.classList.remove('is-hidden');
        syncHeaderTitleState();
      });

      const clearTitleImageDockTimer = () => {
        if (!titleImageDockTimer) return;
        clearTimeout(titleImageDockTimer);
        titleImageDockTimer = null;
      };

      const syncHeaderTitleState = () => {
        if (!playerShell) return;
        const hasVisibleTitleImage = !!(
          animeTitleImageEl &&
          !animeTitleImageEl.classList.contains('is-hidden') &&
          animeTitleImageEl.getAttribute('src')
        );
        const hasVisibleFallbackTitle = !!(
          episodeTitleEl &&
          !episodeTitleEl.classList.contains('is-hidden') &&
          String(episodeTitleEl.textContent || '').trim()
        );
        const shouldShowTitle = !!state.controlsVisible && (hasVisibleTitleImage || hasVisibleFallbackTitle);

        playerShell.classList.toggle('ui-title-visible', shouldShowTitle);
        if (!shouldShowTitle) {
          clearTitleImageDockTimer();
          playerShell.classList.remove('ui-title-docked');
          return;
        }

        if (!video.paused) {
          clearTitleImageDockTimer();
          playerShell.classList.remove('ui-title-docked');
          return;
        }

        if (playerShell.classList.contains('ui-title-docked')) {
          return;
        }

        clearTitleImageDockTimer();
        titleImageDockTimer = window.setTimeout(() => {
          titleImageDockTimer = null;
          if (!state.controlsVisible || !video.paused) return;
          playerShell.classList.add('ui-title-docked');
        }, 5000);
      };

      const getAnimePageUrl = () => {
        if (state.animeSlug) {
          return `/anime/${encodeURIComponent(state.animeSlug)}`;
        }
        return '/';
      };

      const getEpisodeNavigationTarget = (direction = 'next') => {
        const dir = direction === 'prev' ? 'prev' : 'next';

        if (state.currentEpisodeToken && state.allEpisodes.length) {
          const currentKey = normalizeEpisodeToken(state.currentEpisodeToken);
          const currentIndex = state.allEpisodes.findIndex((ep) => {
            const tokenValue = ep?.token || ep?.watch_path || '';
            return normalizeEpisodeToken(tokenValue) === currentKey;
          });

          if (currentIndex >= 0) {
            const targetIndex = dir === 'next' ? currentIndex + 1 : currentIndex - 1;
            if (targetIndex >= 0 && targetIndex < state.allEpisodes.length) {
              return state.allEpisodes[targetIndex] || null;
            }
          }
        }

        return dir === 'next' ? (state.navigationNext || null) : (state.navigationPrev || null);
      };

      const clearNextEpisodePromptTimer = () => {
        if (!state.nextPromptTimer) return;
        clearTimeout(state.nextPromptTimer);
        state.nextPromptTimer = null;
      };

      const hideNextEpisodePrompt = ({ preserveUiSession = false } = {}) => {
        clearNextEpisodePromptTimer();
        state.nextPromptVisible = false;
        if (!preserveUiSession) {
          state.nextPromptShownForUiSession = false;
        }
        watchNextToast.dataset.visible = 'false';
        watchNextToast.setAttribute('aria-hidden', 'true');
      };

      const showNextEpisodePrompt = (targetEpisode) => {
        if (!targetEpisode?.watch_path) {
          hideNextEpisodePrompt();
          return;
        }

        const targetTitle = cleanEpisodeTitle(
          targetEpisode?.episode_title ||
          targetEpisode?.nome ||
          targetEpisode?.label ||
          'Próximo episódio'
        );
        const metaParts = [];
        if (Number.isFinite(Number(targetEpisode?.temporada)) && Number(targetEpisode.temporada) > 0) {
          metaParts.push(`T${Number(targetEpisode.temporada)}`);
        }
        if (targetEpisode?.numero !== null && targetEpisode?.numero !== undefined && String(targetEpisode.numero).trim()) {
          metaParts.push(`EP ${String(targetEpisode.numero).trim()}`);
        }
        const compactLabel = metaParts.length
          ? `Próximo episódio ${metaParts.join(' • ')}`
          : 'Próximo episódio';
        watchNextToastTitle.textContent = compactLabel;
        watchNextToastBtn.title = targetTitle || 'Próximo episódio';
        watchNextToast.dataset.visible = 'true';
        watchNextToast.setAttribute('aria-hidden', 'false');
        state.nextPromptVisible = true;
        state.nextPromptShownForUiSession = true;
        clearNextEpisodePromptTimer();
        state.nextPromptTimer = window.setTimeout(() => {
          hideNextEpisodePrompt({ preserveUiSession: true });
        }, 7000);
      };

      const updateNextEpisodePrompt = () => {
        const nextTarget = getEpisodeNavigationTarget('next');
        const duration = Number(video.duration || state.duration || 0);
        const current = Number(video.currentTime || 0);
        const allowByUiState = !!(state.controlsVisible || video.paused);
        if (!nextTarget?.watch_path || !Number.isFinite(duration) || duration <= 0 || video.ended || !allowByUiState || state.endcardVisible) {
          hideNextEpisodePrompt();
          return;
        }

        const remaining = duration - current;
        if (remaining > 0 && remaining <= 210) {
          if (state.nextPromptShownForUiSession && !state.nextPromptVisible) {
            return;
          }
          showNextEpisodePrompt(nextTarget);
          return;
        }

        hideNextEpisodePrompt();
      };

      const getSkipPromptLabel = (type = '') => {
        const normalizedType = String(type || '').trim().toLowerCase();
        if (normalizedType === 'intro') return 'Pular abertura';
        if (normalizedType === 'recap') return 'Pular recap';
        if (normalizedType === 'credits') return 'Pular créditos';
        if (normalizedType === 'preview') return 'Pular prévia';
        return 'Pular trecho';
      };

      const normalizeSkipSegment = (segment, type = '') => {
        if (!segment || typeof segment !== 'object') return null;
        const startTime = Number(segment.startTime);
        const endTime = Number(segment.endTime);
        if (!Number.isFinite(startTime) || !Number.isFinite(endTime) || endTime <= startTime) {
          return null;
        }
        return {
          type: String(type || '').trim().toLowerCase(),
          startTime: Math.max(0, startTime),
          endTime: Math.max(0, endTime),
          duration: Math.max(0, endTime - startTime)
        };
      };

      const normalizeSkipPayload = (skip) => {
        if (!skip || typeof skip !== 'object') return null;
        const normalized = {
          source: String(skip.source || '').trim().toLowerCase() || null,
          intro: normalizeSkipSegment(skip.intro, 'intro'),
          recap: normalizeSkipSegment(skip.recap, 'recap'),
          credits: normalizeSkipSegment(skip.credits, 'credits'),
          preview: normalizeSkipSegment(skip.preview, 'preview')
        };
        if (!normalized.intro && !normalized.recap && !normalized.credits && !normalized.preview) {
          return null;
        }
        return normalized;
      };

      const hideSkipPrompt = () => {
        state.skipPromptVisible = false;
        state.skipCurrentType = null;
        if (!watchSkipToast) return;
        watchSkipToast.dataset.visible = 'false';
        watchSkipToast.setAttribute('aria-hidden', 'true');
      };

      const showSkipPrompt = (type, windowData) => {
        if (!watchSkipToast || !watchSkipToastTitle || !windowData) return;
        state.skipPromptVisible = true;
        state.skipCurrentType = String(type || '').trim().toLowerCase() || null;
        watchSkipToastTitle.textContent = getSkipPromptLabel(type);
        watchSkipToastBtn.title = `${getSkipPromptLabel(type)} (${formatTime(windowData.endTime)})`;
        watchSkipToast.dataset.visible = 'true';
        watchSkipToast.setAttribute('aria-hidden', 'false');
      };

      const getActiveSkipWindow = (currentTime = Number(video.currentTime || 0)) => {
        if (!state.skipData) return null;
        const current = Number(currentTime || 0);
        if (!Number.isFinite(current) || current < 0) return null;
        const orderedTypes = ['intro', 'recap', 'credits', 'preview'];
        for (const type of orderedTypes) {
          const segment = state.skipData?.[type];
          if (!segment) continue;
          if (current >= segment.startTime && current < Math.max(segment.startTime + 0.05, segment.endTime - 0.05)) {
            return {
              type,
              ...segment
            };
          }
        }
        return null;
      };

      const skipCurrentSegment = async ({ auto = false } = {}) => {
        const activeWindow = getActiveSkipWindow();
        if (!activeWindow) return false;
        const target = Math.max(
          activeWindow.endTime + 0.05,
          activeWindow.startTime + 0.05
        );
        try {
          video.currentTime = target;
        } catch (_) {
          return false;
        }
        if (auto && activeWindow.type) {
          state.skipAutoApplied[activeWindow.type] = true;
        }
        hideSkipPrompt();
        return true;
      };

      const updateSkipPrompt = () => {
        if (!watchSkipToast) return;
        if (
          !state.skipData ||
          state.clipModalOpen ||
          state.commentsPanelOpen ||
          state.endcardVisible ||
          playerShell.dataset.buffering === 'true' ||
          !errorEl.classList.contains('hidden')
        ) {
          hideSkipPrompt();
          return;
        }

        const activeWindow = getActiveSkipWindow();
        if (!activeWindow) {
          hideSkipPrompt();
          return;
        }

        const canAutoSkip =
          !!state.userPrefs.autoSkipIntro &&
          !video.paused &&
          (activeWindow.type === 'intro' || activeWindow.type === 'recap');
        if (canAutoSkip && !state.skipAutoApplied[activeWindow.type]) {
          state.skipAutoApplied[activeWindow.type] = true;
          skipCurrentSegment({ auto: true }).catch(() => null);
          return;
        }

        showSkipPrompt(activeWindow.type, activeWindow);
      };

      const updateEndcardRatingUi = () => {
        const activeValue = String(state.currentAnimeRating || '').trim().toLowerCase();
        watchEndcardRatingButtons.forEach((button) => {
          const value = String(button.dataset.ratingValue || '').trim().toLowerCase();
          button.classList.toggle('is-active', !!activeValue && activeValue === value);
        });
      };

      const renderEndcardReactionIcons = () => {
        watchEndcardRatingButtons.forEach((button) => {
          const iconHost = button.querySelector('.watch-endcard__reaction-icons');
          if (!iconHost) return;
          const iconCount = Math.max(1, Math.min(3, Number(button.dataset.iconCount || 1)));
          const isDown = String(button.dataset.iconDirection || '').trim().toLowerCase() === 'down';
          iconHost.innerHTML = Array.from({ length: iconCount }).map(() => (
            `<span class="watch-endcard__reaction-icon${isDown ? ' is-down' : ''}">${WATCH_REACTION_ICON}</span>`
          )).join('');
        });
      };

      const stopEndcardBackgroundCycle = () => {
        if (!state.endcardBackgroundTimer) return;
        clearInterval(state.endcardBackgroundTimer);
        state.endcardBackgroundTimer = null;
      };

      const buildEndcardMetaText = (item) => {
        const metaParts = [];
        if (Number.isFinite(Number(item?.ano)) && Number(item.ano) > 0) metaParts.push(String(Number(item.ano)));
        if (Number.isFinite(Number(item?.episodios)) && Number(item.episodios) > 0) metaParts.push(`${Number(item.episodios)} episódios`);
        if (Number.isFinite(Number(item?.rating)) && Number(item.rating) > 0) metaParts.push(`${Number(item.rating).toFixed(1)} TMDB`);
        return metaParts.join(' • ') || 'BerryAnimes';
      };

      const normalizeEndcardRecommendation = (item) => {
        const title = String(item?.nome || item?.title || 'Anime recomendado').trim() || 'Anime recomendado';
        const description = String(item?.descricao || item?.sinopse || item?.overview || item?.description || '').trim()
          || `Descubra por que ${title} pode ser uma boa próxima escolha depois de ${state.animeName || 'este anime'}.`;
        const url = item?.slug ? `/anime/${encodeURIComponent(item.slug)}` : getAnimePageUrl();
        const cover = toAbsoluteAssetUrl(item?.cover || item?.banner || item?.image || '') || toAbsoluteAssetUrl(state.animeCoverUrl || '') || '/images/default-cover.jpg';
        return {
          title,
          description,
          meta: buildEndcardMetaText(item),
          url,
          cover
        };
      };

      const renderActiveEndcardRecommendation = (index) => {
        const items = Array.isArray(state.endcardHeroItems) ? state.endcardHeroItems : [];
        if (!items.length) {
          const animeTitle = state.animeName || 'este anime';
          watchEndcardEyebrow.textContent = `Se você gostou de ${animeTitle}`;
          watchEndcardAnimeTitle.textContent = animeTitle;
          watchEndcardMeta.textContent = 'BerryAnimes';
          watchEndcardDescription.textContent = `Continue explorando o catálogo depois de ${animeTitle}.`;
          watchEndcardPrimaryLink.href = getAnimePageUrl();
          watchEndcardPrimaryLink.textContent = 'Voltar para o anime';
          return;
        }

        const item = items[index] || items[0];
        const animeTitle = state.animeName || cleanEpisodeTitle(state.episodeTitle || 'este anime');
        watchEndcardEyebrow.textContent = `Se você gostou de ${animeTitle}`;
        watchEndcardAnimeTitle.textContent = item.title;
        watchEndcardMeta.textContent = item.meta;
        watchEndcardDescription.textContent = item.description;
        watchEndcardPrimaryLink.href = item.url || getAnimePageUrl();
        watchEndcardPrimaryLink.textContent = 'Abrir anime';
      };

      const setActiveEndcardBackground = (index) => {
        const slides = Array.from(watchEndcardBackgrounds.querySelectorAll('.watch-endcard__background'));
        if (!slides.length) {
          state.endcardBackgroundIndex = 0;
          renderActiveEndcardRecommendation(0);
          return;
        }
        const normalizedIndex = ((Number(index) || 0) % slides.length + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => {
          slide.classList.toggle('is-active', slideIndex === normalizedIndex);
        });
        state.endcardBackgroundIndex = normalizedIndex;
        renderActiveEndcardRecommendation(normalizedIndex);
      };

      const startEndcardBackgroundCycle = () => {
        stopEndcardBackgroundCycle();
        const slides = Array.from(watchEndcardBackgrounds.querySelectorAll('.watch-endcard__background'));
        if (slides.length <= 1 || !state.endcardVisible) return;
        state.endcardBackgroundTimer = window.setInterval(() => {
          if (!state.endcardVisible) {
            stopEndcardBackgroundCycle();
            return;
          }
          setActiveEndcardBackground(state.endcardBackgroundIndex + 1);
        }, 3800);
      };

      const renderEndcardRecommendations = () => {
        const rawRecommendations = Array.isArray(state.endcardRecommendations) ? state.endcardRecommendations : [];
        const fallbackRecommendation = {
          slug: state.animeSlug || '',
          nome: state.animeName || 'Anime recomendado',
          cover: state.animeCoverUrl || '/images/default-cover.jpg',
          ano: null,
          episodios: null,
          rating: null
        };
        const recommendations = (rawRecommendations.length ? rawRecommendations : [fallbackRecommendation])
          .map(normalizeEndcardRecommendation)
          .filter(Boolean);

        state.endcardHeroItems = recommendations;
        watchEndcardBackgrounds.innerHTML = recommendations.map((item, index) => {
          return `<div class="watch-endcard__background${index === 0 ? ' is-active' : ''}" style="background-image:url('${escapeHtml(item.cover)}')"></div>`;
        }).join('');
        setActiveEndcardBackground(0);
      };

      const hideWatchEndcard = () => {
        state.endcardVisible = false;
        watchPage.classList.remove('watch-endcard-active');
        stopEndcardBackgroundCycle();
        watchEndcard.dataset.visible = 'false';
        watchEndcard.setAttribute('aria-hidden', 'true');
        updateSkipPrompt();
      };

      const showWatchEndcard = () => {
        if (state.endcardVisible) return;
        hideSkipPrompt();
        hideNextEpisodePrompt();
        renderEndcardRecommendations();
        updateEndcardRatingUi();
        watchEndcard.dataset.visible = 'true';
        watchEndcard.setAttribute('aria-hidden', 'false');
        state.endcardVisible = true;
        watchPage.classList.add('watch-endcard-active');
        startEndcardBackgroundCycle();
      };

      const updateFinalEpisodeHeroState = () => {
        const nextTarget = getEpisodeNavigationTarget('next');
        if (nextTarget?.watch_path) {
          if (state.endcardVisible) hideWatchEndcard();
          return;
        }

        const duration = Number(video.duration || state.duration || 0);
        const current = Number(video.currentTime || 0);
        if (!Number.isFinite(duration) || duration <= 0) {
          return;
        }

        const remaining = duration - current;
        const shouldShowHero = video.ended || (remaining > 0 && remaining <= 15);
        if (shouldShowHero) {
          showWatchEndcard();
          return;
        }

        if (state.endcardVisible) {
          hideWatchEndcard();
        }
      };

      const submitAnimeRating = async (sentiment) => {
        const normalized = String(sentiment || '').trim().toLowerCase();
        if (!state.animeId || !['odiei', 'gostei', 'amei'].includes(normalized)) return;

        watchEndcardRatingButtons.forEach((button) => {
          button.disabled = true;
        });

        try {
          const response = await fetch(`/api/anime/${encodeURIComponent(state.animeId)}/rating`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sentimento: normalized })
          });
          const data = await response.json().catch(() => ({}));
          if (!response.ok || data?.error) {
            throw new Error(data?.error || 'Falha ao salvar avaliação');
          }

          state.currentAnimeRating = normalized;
          state.animeRatingCounts = data?.snapshot?.counts || { odiei: 0, gostei: 0, amei: 0 };
          state.animeRatingTotal = Number(data?.snapshot?.total || 0);
          updateEndcardRatingUi();
        } catch (error) {
          console.warn('[Watch] Falha ao salvar avaliação administrativa:', error?.message || error);
        } finally {
          watchEndcardRatingButtons.forEach((button) => {
            button.disabled = false;
          });
        }
      };

      const normalizeEpisodeToken = (value) => {
        if (!value) return null;
        const raw = String(value).trim();
        if (!raw) return null;
        const match = raw.match(/^episode-[0-9]+(?:\.[0-9]+)?-(.+)$/i);
        return match ? match[1] : raw;
      };

      const extractWatchRouteTokens = () => {
        const rawParts = window.location.pathname.split('/').filter(Boolean);
        const decodedParts = rawParts.map((part) => {
          try {
            return decodeURIComponent(part || '');
          } catch {
            return String(part || '');
          }
        });
        const watchIndex = decodedParts.findIndex((part) => String(part || '').toLowerCase() === 'watch');
        if (watchIndex >= 0) {
          return {
            seasonToken: String(decodedParts[watchIndex + 1] || '').trim(),
            episodeToken: String(decodedParts[watchIndex + 2] || '').trim()
          };
        }
        return {
          seasonToken: String(decodedParts[1] || '').trim(),
          episodeToken: String(decodedParts[2] || '').trim()
        };
      };

      const getNavigationAudioParam = () => {
        const params = new URLSearchParams(window.location.search || '');
        const currentAudio = params.get('audio');
        if (currentAudio) return currentAudio;
        if (state.userPrefs?.preferDub) return 'dub';
        if (state.userPrefs?.audioLang) return state.userPrefs.audioLang;
        return 'dub';
      };

      const buildNavigationUrl = (path) => {
        if (!path) return null;
        const url = new URL(path, window.location.origin);
        const params = new URLSearchParams(url.search || '');

        const currentParams = new URLSearchParams(window.location.search || '');
        const provider = currentParams.get('provider');
        if (provider) params.set('provider', provider);

        const audio = getNavigationAudioParam();
        if (audio) params.set('audio', audio);
        params.delete('autonext');

        const query = params.toString();
        return `${url.pathname}${query ? `?${query}` : ''}`;
      };

      const buildNavigationUrlWithOptions = (path, options = {}) => {
        const baseUrl = buildNavigationUrl(path);
        if (!baseUrl) return null;
        const url = new URL(baseUrl, window.location.origin);
        const params = new URLSearchParams(url.search || '');
        if (options.forceAutoplay) {
          params.set('autonext', '1');
        } else {
          params.delete('autonext');
        }
        const query = params.toString();
        return `${url.pathname}${query ? `?${query}` : ''}`;
      };

      const shouldAutoPlayCurrentMedia = () => {
        return !!(state.userPrefs.autoplay || state.forcePlaybackOnLoad);
      };

      const resolveStreamUrlFromPlayerData = (playerData = {}) => {
        if (!playerData || typeof playerData !== 'object') return null;
        const provider = String(playerData.provider || '').toLowerCase();
        if (provider !== 'videoapi') {
          return playerData.streamUrl || playerData.watchUrl || null;
        }

        const streamUrl = playerData.streamUrl || playerData.watchUrl || '';
        if (streamUrl) return streamUrl;

        const fromUrl = streamUrl.match(/[a-f0-9-]{10,}/i);
        const videoId = playerData.videoId || playerData.video_id || (fromUrl ? fromUrl[0] : null);
        if (!videoId) return null;

        const contextToken = String(playerData.streamContextToken || '').trim();
        const base = `/api/videoapi/stream/${encodeURIComponent(videoId)}/master.m3u8`;
        return contextToken ? `${base}?ctx=${encodeURIComponent(contextToken)}` : base;
      };

      const inferMimeType = (url = '', hint = '') => {
        const lowerHint = String(hint || '').toLowerCase();
        const lowerUrl = String(url || '').toLowerCase();
        if (lowerHint.includes('mpegurl') || lowerHint.includes('m3u8') || lowerUrl.includes('.m3u8')) {
          return 'application/x-mpegURL';
        }
        if (lowerHint.includes('mpd') || lowerHint.includes('dash') || lowerUrl.includes('.mpd')) {
          return 'application/dash+xml';
        }
        if (lowerHint.includes('mp4') || lowerUrl.includes('.mp4')) {
          return 'video/mp4';
        }
        return 'video/mp4';
      };

      const resolveHlsManifestLinkedAssetUrl = (value = '', manifestUrl = '') => {
        const rawValue = String(value || '').trim();
        const absoluteManifestUrl = toAbsoluteAssetUrl(manifestUrl || '');
        if (!rawValue || !absoluteManifestUrl) return null;
        try {
          const manifest = new URL(absoluteManifestUrl);
          const resolved = new URL(rawValue, manifest);
          manifest.searchParams.forEach((paramValue, paramKey) => {
            if (!resolved.searchParams.has(paramKey)) {
              resolved.searchParams.set(paramKey, paramValue);
            }
          });
          return resolved.toString();
        } catch {
          return null;
        }
      };

      const extractHlsMediaAttributeValue = (line = '', key = '') => {
        const safeLine = String(line || '');
        const safeKey = String(key || '').trim();
        if (!safeLine || !safeKey) return '';
        const quotedMatch = safeLine.match(new RegExp(`${safeKey}=\"([^\"]*)\"`, 'i'));
        if (quotedMatch?.[1]) return String(quotedMatch[1] || '').trim();
        const bareMatch = safeLine.match(new RegExp(`${safeKey}=([^,]+)`, 'i'));
        return bareMatch?.[1] ? String(bareMatch[1] || '').trim() : '';
      };

      const parseHlsManifestSubtitleTracks = (content = '', manifestUrl = '') => {
        if (typeof content !== 'string' || !content.trim()) return [];
        const tracks = [];
        const lines = content.split(/\r?\n/);
        lines.forEach((rawLine) => {
          const line = String(rawLine || '').trim();
          if (!/^#EXT-X-MEDIA:/i.test(line) || !/TYPE=SUBTITLES/i.test(line)) return;
          const name = extractHlsMediaAttributeValue(line, 'NAME');
          const language = extractHlsMediaAttributeValue(line, 'LANGUAGE');
          const uri = extractHlsMediaAttributeValue(line, 'URI');
          const playlistUrl = resolveHlsManifestLinkedAssetUrl(uri, manifestUrl);
          if (!playlistUrl) return;

          let textUrl = playlistUrl;
          try {
            const parsedPlaylistUrl = new URL(playlistUrl);
            if (/\.m3u8$/i.test(String(parsedPlaylistUrl.pathname || ''))) {
              parsedPlaylistUrl.pathname = String(parsedPlaylistUrl.pathname || '').replace(/\.m3u8$/i, '.vtt');
              textUrl = parsedPlaylistUrl.toString();
            }
          } catch {}
          const parsedIndex = parseCodexSubtitleIndexFromValue(uri || playlistUrl || textUrl || name || '');

          tracks.push({
            index: Number.isInteger(parsedIndex) && parsedIndex >= 0 ? parsedIndex : tracks.length,
            name: name || '',
            label: name || '',
            lang: language || '',
            language: language || '',
            url: playlistUrl,
            playlistUrl,
            textUrl
          });
        });
        return tracks;
      };

      const loadHlsManifestSubtitleFallbackTracks = async (manifestUrl = '') => {
        const absoluteManifestUrl = toAbsoluteAssetUrl(manifestUrl || '');
        if (!absoluteManifestUrl || !/\.m3u8(?:$|[?#])/i.test(absoluteManifestUrl)) {
          state.hlsManifestSubtitleTracks = [];
          state.hlsManifestSubtitleUrl = '';
          syncWatchDebugState();
          return [];
        }
        if (
          absoluteManifestUrl === String(state.hlsManifestSubtitleUrl || '').trim() &&
          Array.isArray(state.hlsManifestSubtitleTracks) &&
          state.hlsManifestSubtitleTracks.length
        ) {
          return state.hlsManifestSubtitleTracks.slice();
        }
        try {
          const response = await fetch(absoluteManifestUrl, {
            credentials: 'same-origin'
          });
          if (!response.ok) throw new Error(`manifest_http_${response.status}`);
          const body = await response.text();
          const tracks = parseHlsManifestSubtitleTracks(body, absoluteManifestUrl);
          state.hlsManifestSubtitleTracks = tracks;
          state.hlsManifestSubtitleUrl = absoluteManifestUrl;
          syncWatchDebugState();
          return tracks.slice();
        } catch {
          state.hlsManifestSubtitleTracks = [];
          state.hlsManifestSubtitleUrl = absoluteManifestUrl;
          syncWatchDebugState();
          return [];
        }
      };

      const destroyHls = () => {
        clearHlsSubtitleSyncTimers();
        state.pendingHlsSubtitleTargetIndex = null;
        state.hlsManifestSubtitleTracks = [];
        state.hlsManifestSubtitleUrl = '';
        if (state.hls) {
          try { state.hls.destroy(); } catch (_) {}
          state.hls = null;
        }
        state.qualityPreference = 'auto';
      };

      const setupCastAvailability = () => {
        const enable =
          !state.externalEmbedMode &&
          !!(window.__CAST_READY && window.cast && window.chrome && window.cast.framework);
        castBtn.disabled = !enable;
      };

      const applyPlayState = () => {
        const playing = !video.paused && !video.ended;
        playBtn.dataset.playing = playing ? 'true' : 'false';
      };

      const applyMuteState = () => {
        muteBtn.dataset.muted = video.muted || video.volume <= 0 ? 'true' : 'false';
      };

      const applyPipState = () => {
        const on = !state.externalEmbedMode && document.pictureInPictureElement === video;
        pipBtn.dataset.pip = on ? 'on' : 'off';
        pipBtn.disabled = !!state.externalEmbedMode || !document.pictureInPictureEnabled;
      };

      const applyFullscreenState = () => {
        const on = document.fullscreenElement === playerShell;
        fullscreenBtn.dataset.fullscreen = on ? 'on' : 'off';
      };

      const getSubtitleTracks = () => {
        const tracks = Array.from(video.textTracks || []);
        return tracks.filter((track) => track.kind === 'subtitles' || track.kind === 'captions');
      };

      const getAssFallbackTextTrack = () => {
        const track = state.assFallbackTrackEl?.track || null;
        return track || null;
      };

      const isAssBlockingHlsSubtitles = () => {
        if (state.assSubtitleEnabled) return true;
        const fallbackTrack = getAssFallbackTextTrack();
        if (!fallbackTrack) return false;
        const activeOptionId = String(state.activeSubtitleOptionId || '').trim().toLowerCase();
        if (activeOptionId === 'off') return false;
        const fallbackOptionId = String(state.assFallbackOptionId || '').trim().toLowerCase();
        const fallbackMatchesActive = !!(fallbackOptionId && activeOptionId && fallbackOptionId === activeOptionId);
        return fallbackMatchesActive;
      };

      const clearHlsSubtitleSyncTimers = () => {
        const timers = Array.isArray(state.hlsSubtitleSyncTimers) ? state.hlsSubtitleSyncTimers : [];
        timers.forEach((timerId) => {
          try { clearTimeout(timerId); } catch (_) {}
        });
        state.hlsSubtitleSyncTimers = [];
      };

      const disableHlsSubtitleTrack = () => {
        if (!state.hls || !Array.isArray(state.hls.subtitleTracks) || !state.hls.subtitleTracks.length) return false;
        clearHlsSubtitleSyncTimers();
        state.pendingHlsSubtitleTargetIndex = null;
        const current = Number(state.hls.subtitleTrack);
        if (Number.isFinite(current) && current < 0) {
          setHlsSubtitleDisplay(false);
          return true;
        }
        try {
          state.hls.subtitleTrack = -1;
          setHlsSubtitleDisplay(false);
          return true;
        } catch (_) {}
        return false;
      };

      const setHlsSubtitleDisplay = (enabled) => {
        if (!state.hls) return;
        try {
          state.hls.subtitleDisplay = !!enabled;
        } catch (_) {}
      };

      const forceShowTextTrack = (track) => {
        if (!track) return;
        try {
          track.mode = 'hidden';
          setTimeout(() => {
            try {
              if (track.mode !== 'disabled') track.mode = 'showing';
            } catch (_) {}
          }, 0);
        } catch (_) {}
      };

      const syncNativeTrackWithHlsSubtitleIndex = (preferredIndex = null) => {
        if (hasCodexCanonicalSubtitleTracks()) return;
        if (isAssBlockingHlsSubtitles()) return;
        if (!state.hls || !Array.isArray(state.hls.subtitleTracks) || !state.hls.subtitleTracks.length) return;
        const activeIndex = Number.isFinite(Number(preferredIndex))
          ? Number(preferredIndex)
          : Number(state.hls.subtitleTrack);
        if (!Number.isFinite(activeIndex) || activeIndex < 0) return;

        const hlsTrack = state.hls.subtitleTracks[activeIndex] || null;
        if (!hlsTrack) return;

        const nativeTracks = getSubtitleTracks();
        if (!nativeTracks.length) return;

        const targetLang = String(hlsTrack?.lang || hlsTrack?.language || '').trim().toLowerCase();
        const targetName = String(hlsTrack?.name || hlsTrack?.label || '').trim().toLowerCase();

        const findByLang = () => {
          if (!targetLang) return null;
          return nativeTracks.find((track) => {
            const lang = String(track?.language || track?.srclang || '').trim().toLowerCase();
            if (!lang) return false;
            return lang === targetLang || lang.startsWith(targetLang) || targetLang.startsWith(lang);
          }) || null;
        };

        const findByName = () => {
          if (!targetName) return null;
          return nativeTracks.find((track) => {
            const label = String(track?.label || '').trim().toLowerCase();
            return !!(label && (label === targetName || label.includes(targetName) || targetName.includes(label)));
          }) || null;
        };

        const fallbackByIndex = Number.isInteger(activeIndex) && activeIndex >= 0 && activeIndex < nativeTracks.length
          ? nativeTracks[activeIndex]
          : null;
        const selectedNative = findByLang() || findByName() || fallbackByIndex;
        if (!selectedNative) return;

        nativeTracks.forEach((track) => {
          try {
            track.mode = track === selectedNative ? 'showing' : 'disabled';
          } catch (_) {}
        });
        forceShowTextTrack(selectedNative);
      };

      const scheduleHlsSubtitleSync = (preferredIndex = null, expectedOptionId = null) => {
        clearHlsSubtitleSyncTimers();
        if (hasCodexCanonicalSubtitleTracks()) {
          disableHlsSubtitleTrack();
          return;
        }
        if (isAssBlockingHlsSubtitles()) {
          disableHlsSubtitleTrack();
          return;
        }
        const generation = Number(state.hlsSubtitleSyncGeneration || 0) + 1;
        state.hlsSubtitleSyncGeneration = generation;
        const attemptsMs = [0, 120, 320, 650, 1200, 2000];
        attemptsMs.forEach((delayMs) => {
          const timerId = setTimeout(() => {
            if (generation !== Number(state.hlsSubtitleSyncGeneration || 0)) return;
            if (!state.hls || !Array.isArray(state.hls.subtitleTracks) || !state.hls.subtitleTracks.length) return;
            if (isAssBlockingHlsSubtitles()) {
              disableHlsSubtitleTrack();
              return;
            }
            const current = Number.isFinite(Number(preferredIndex))
              ? Number(preferredIndex)
              : Number(state.hls.subtitleTrack);
            if (!Number.isFinite(current) || current < 0) return;
            const activeOptionId = String(state.activeSubtitleOptionId || '').trim();
            if (expectedOptionId && activeOptionId && activeOptionId !== String(expectedOptionId)) return;
            if (Number(state.hls.subtitleTrack) !== current) {
              try { state.hls.subtitleTrack = current; } catch (_) {}
            }
            setHlsSubtitleDisplay(true);
            syncNativeTrackWithHlsSubtitleIndex(current);
          }, delayMs);
          state.hlsSubtitleSyncTimers.push(timerId);
        });
      };

      const countLikelyMojibakeFragments = (value = '') => {
        return (String(value || '').match(/Ã.|Â.|â€|â€™|â€œ|â€\u009d|â€¦|ðŸ|Å.|Ð.|Ñ.|¤|�/g) || []).length;
      };

      const repairLikelyMojibakeText = (value = '') => {
        const raw = String(value || '');
        if (!raw) return '';
        const latin1Decoded = (() => {
          try {
            return decodeURIComponent(escape(raw));
          } catch {
            return raw;
          }
        })();
        const rawScore = countLikelyMojibakeFragments(raw);
        const decodedScore = countLikelyMojibakeFragments(latin1Decoded);
        return decodedScore + 1 < rawScore ? latin1Decoded : raw;
      };

      const normalizeLangToken = (value, { allowOff = false } = {}) => {
        const original = repairLikelyMojibakeText(String(value || '').trim());
        const raw = original.toLowerCase();
        if (!raw || raw === 'auto' || raw === 'default') return null;
        if (allowOff && (raw === 'off' || raw === 'desativado' || raw === 'none')) return 'off';
        if (/[а-яё]/i.test(original) || raw.includes('русский')) return 'ru';
        if (/[ء-ي]/.test(original) || raw.includes('العربية') || raw.includes('عربي')) return 'ar';
        if (/[ぁ-んァ-ン一-龯]/.test(original) || raw.includes('日本語')) return 'ja';
        if (/[가-힣]/.test(original) || raw.includes('한국어')) return 'ko';
        if (/[一-龯]/.test(original) || raw.includes('中文')) return 'zh';
        const cleaned = raw
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/_/g, '-')
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');
        return cleaned || null;
      };

      const normalizeSubtitleLangAlias = (value, { allowOff = false } = {}) => {
        const token = normalizeLangToken(value, { allowOff });
        if (!token) return null;
        if (token === 'off') return 'off';
        const compact = token.replace(/-/g, '');
        if ([
          'ptbr', 'pob',
          'portuguesbr', 'portuguesbrasil', 'portuguesebr', 'portuguesebrazil',
          'portuguesbrazil', 'portugusbr', 'portugusbrasil'
        ].includes(compact)) return 'pt-br';
        if (['pt', 'por', 'portugues', 'portuguese', 'portugus'].includes(compact)) return 'pt';
        if (['ptpt', 'portuguespt'].includes(compact)) return 'pt-pt';
        if (['en', 'eng', 'english', 'enus'].includes(compact)) return 'en';
        if (['es', 'spa', 'esp', 'eses', 'espanol', 'spanish'].includes(compact)) return 'es';
        if (['fr', 'fra', 'fre', 'frfr', 'french', 'francais', 'franais'].includes(compact)) return 'fr';
        if (['de', 'deu', 'ger', 'dede', 'german', 'deutsch'].includes(compact)) return 'de';
        if (['it', 'ita', 'itit', 'italian', 'italiano'].includes(compact)) return 'it';
        if (['ru', 'rus', 'ruru', 'russian'].includes(compact)) return 'ru';
        if (['ar', 'ara', 'arsa', 'arabic'].includes(compact)) return 'ar';
        if (['tr', 'tur', 'trtr', 'turkish', 'turkce'].includes(compact)) return 'tr';
        if (['hi', 'hin', 'hiin', 'hindi'].includes(compact)) return 'hi';
        if (['ko', 'kor', 'kokr', 'korean'].includes(compact)) return 'ko';
        if (['zh', 'zho', 'chi', 'zhcn', 'zhtw', 'chinese', 'mandarin'].includes(compact)) return 'zh';
        if (['pl', 'pol', 'plpl', 'polish', 'polski'].includes(compact)) return 'pl';
        if (['id', 'ind', 'idid', 'indonesian', 'bahasaindonesia'].includes(compact)) return 'id';
        if (['ms', 'may', 'msmy', 'malay', 'bahasamelayu'].includes(compact)) return 'ms';
        if (['vi', 'vie', 'vivn', 'vietnamese', 'tiengviet'].includes(compact)) return 'vi';
        if (['th', 'tha', 'thth', 'thai'].includes(compact)) return 'th';
        if (['ja', 'jp', 'jpn', 'jajp', 'japanese', 'japones'].includes(compact)) return 'ja';
        if (compact === 'und') return 'und';
        // Evita tratar tokens de arquivo/episódio como idioma (ex.: "ep-3771").
        if (!/^[a-z]{2,3}(?:-[a-z]{2,4})?$/.test(token)) return null;
        return token;
      };

      const subtitleLangEqualsTarget = (candidate = null, target = null) => {
        const candidateLang = normalizeSubtitleLangAlias(candidate, { allowOff: true });
        const targetLang = normalizeSubtitleLangAlias(target, { allowOff: true });
        if (!candidateLang || !targetLang || targetLang === 'off') return false;
        return candidateLang === targetLang;
      };

      const subtitleLangMatchesTarget = (candidate = null, target = null) => {
        const candidateLang = normalizeSubtitleLangAlias(candidate, { allowOff: true });
        const targetLang = normalizeSubtitleLangAlias(target, { allowOff: true });
        if (!candidateLang || !targetLang || targetLang === 'off') return false;
        if (candidateLang === targetLang) return true;
        if (targetLang === 'pt-br') return candidateLang === 'pt' || candidateLang === 'pt-pt';
        if (targetLang === 'pt') return candidateLang === 'pt-br' || candidateLang === 'pt-pt';
        if (targetLang === 'pt-pt') return candidateLang === 'pt' || candidateLang === 'pt-br';
        return false;
      };

      const PRIVACY_AUDIO_LANGS = new Set(['pt-br', 'pt', 'pt-pt', 'en', 'es', 'ja', 'fr', 'de', 'it', 'ru', 'ar', 'tr', 'hi', 'ko', 'zh', 'pl', 'id', 'ms', 'vi', 'th']);
      const PRIVACY_SUBTITLE_LANGS = new Set(['pt-br', 'pt', 'pt-pt', 'en', 'es', 'ja', 'fr', 'de', 'it', 'ru', 'ar', 'tr', 'hi', 'ko', 'zh', 'pl', 'id', 'ms', 'vi', 'th', 'off']);

      const normalizePrivacyLang = (value, { allowOff = false } = {}) => {
        const normalized = normalizeSubtitleLangAlias(value, { allowOff });
        if (!normalized) return null;
        const allowedSet = allowOff ? PRIVACY_SUBTITLE_LANGS : PRIVACY_AUDIO_LANGS;
        return allowedSet.has(normalized) ? normalized : null;
      };

      const normalizeSubtitleLabelToken = (value = '') => {
        return String(value || '')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, ' ')
          .trim();
      };

      const parseCodexSubtitleIndexFromValue = (value = '') => {
        const raw = String(value || '').trim();
        if (!raw) return null;
        const fileMatch = raw.match(/sub_(\d+)(?:_orig\.[a-z0-9]+|\.vtt|\.webvtt|\.srt|\.m3u8)/i);
        if (fileMatch?.[1]) {
          const parsed = Number(fileMatch[1]);
          if (Number.isFinite(parsed) && parsed >= 0) return parsed;
        }
        const keyMatch = raw.match(/(?:^|:)sub-(\d+)(?:$|:)/i);
        if (keyMatch?.[1]) {
          const parsed = Number(keyMatch[1]);
          if (Number.isFinite(parsed) && parsed >= 0) return parsed;
        }
        return null;
      };

      const parseCodexVideoIdFromValue = (value = '') => {
        const raw = String(value || '').trim();
        if (!raw) return null;
        const fromPath = raw.match(/^codex:\/\/([^/]+)\//i);
        if (fromPath?.[1]) return String(fromPath[1]).trim().toLowerCase();
        const fromKey = raw.match(/^codex:([^:]+):/i);
        if (fromKey?.[1]) return String(fromKey[1]).trim().toLowerCase();
        return null;
      };

      const parseVideoApiProxyVideoIdFromUrl = (value = '') => {
        const absolute = toAbsoluteAssetUrl(value || '');
        if (!absolute) return null;
        try {
          const pathname = String(new URL(absolute).pathname || '');
          const match = pathname.match(/\/api\/videoapi\/stream\/([^/]+)/i);
          if (!match?.[1]) return null;
          return String(decodeURIComponent(match[1])).trim().toLowerCase() || null;
        } catch {
          return null;
        }
      };

      const getCodexTrackVideoId = (track = null) => {
        if (!track || typeof track !== 'object') return null;
        return String(
          track.videoId
          || track.video_id
          || parseCodexVideoIdFromValue(track.key || '')
          || parseCodexVideoIdFromValue(track.file_path || '')
          || parseVideoApiProxyVideoIdFromUrl(track.subtitle_ass_url || track.ass_url || track.legenda_ass || '')
          || parseVideoApiProxyVideoIdFromUrl(track.subtitle_url || track.legenda_url || '')
          || ''
        ).trim().toLowerCase() || null;
      };

      const extractSubtitleLangCandidatesFromText = (value = '') => {
        const text = String(value || '').trim();
        if (!text) return [];
        const langs = new Set();
        const direct = normalizeSubtitleLangAlias(text, { allowOff: true });
        if (direct && direct !== 'off') langs.add(direct);
        const regex = /\b(pt(?:-?br|-?pt)?|por|pob|en(?:-?us)?|eng|es(?:-?(?:419|la))?|spa|ja(?:-?jp)?|jp|jpn|fr(?:-?fr)?|fra|fre|de(?:-?de)?|deu|ger|it(?:-?it)?|ita|ru(?:-?ru)?|rus|ar(?:-?sa)?|ara|tr(?:-?tr)?|tur|hi(?:-?in)?|hin|ko(?:-?kr)?|kor|zh(?:-?(?:cn|tw))?|zho|chi|pl(?:-?pl)?|pol|id(?:-?id)?|ind|ms(?:-?my)?|may|vi(?:-?vn)?|vie|th(?:-?th)?|tha)\b/gi;
        let match;
        while ((match = regex.exec(text)) !== null) {
          const normalized = normalizeSubtitleLangAlias(match[1], { allowOff: true });
          if (normalized && normalized !== 'off') langs.add(normalized);
        }
        return Array.from(langs);
      };

      const tokenizeSubtitleLabel = (value = '') => {
        const token = normalizeSubtitleLabelToken(value);
        if (!token) return [];
        return token
          .split(/\s+/)
          .map((part) => part.trim())
          .filter(Boolean)
          .filter((part) => !['codex', 'vtt', 'ass', 'ssa', 'srt', 'subtitle', 'legenda', 'excluida', 'hidden'].includes(part));
      };

      const labelsLikelyReferToSameTrack = (left = '', right = '') => {
        const leftToken = normalizeSubtitleLabelToken(left);
        const rightToken = normalizeSubtitleLabelToken(right);
        if (!leftToken || !rightToken) return false;
        if (leftToken === rightToken || leftToken.includes(rightToken) || rightToken.includes(leftToken)) return true;
        const leftWords = tokenizeSubtitleLabel(leftToken);
        const rightWords = tokenizeSubtitleLabel(rightToken);
        if (!leftWords.length || !rightWords.length) return false;
        const rightSet = new Set(rightWords);
        let common = 0;
        for (const word of leftWords) {
          if (rightSet.has(word)) common += 1;
        }
        if (Math.min(leftWords.length, rightWords.length) <= 1) return common >= 1;
        return common >= 2;
      };

      const collectHlsTrackLangCandidates = (track = null, preferredLang = null) => {
        const langs = new Set();
        const addLang = (value) => {
          const normalized = normalizeSubtitleLangAlias(value, { allowOff: true });
          if (normalized && normalized !== 'off') langs.add(normalized);
        };
        addLang(preferredLang);
        const textSources = [
          track?.name,
          track?.label,
          track?.url
        ];
        textSources.forEach((source) => {
          extractSubtitleLangCandidatesFromText(source).forEach((candidate) => langs.add(candidate));
        });
        addLang(track?.lang);
        addLang(track?.language);
        return Array.from(langs);
      };

      const findHlsSubtitleTrackIndexByLang = (lang = null) => {
        const targetLang = normalizeSubtitleLangAlias(lang, { allowOff: true });
        if (!targetLang || targetLang === 'off') return -1;
        if (!state.hls || !Array.isArray(state.hls.subtitleTracks) || !state.hls.subtitleTracks.length) return -1;

        for (let idx = 0; idx < state.hls.subtitleTracks.length; idx += 1) {
          const track = state.hls.subtitleTracks[idx];
          if (isHlsSubtitleTrackExcluded(track, idx)) continue;
          const candidates = collectHlsTrackLangCandidates(track, null);
          if (candidates.some((candidate) => subtitleLangEqualsTarget(candidate, targetLang))) return idx;
        }

        for (let idx = 0; idx < state.hls.subtitleTracks.length; idx += 1) {
          const track = state.hls.subtitleTracks[idx];
          if (isHlsSubtitleTrackExcluded(track, idx)) continue;
          const candidates = collectHlsTrackLangCandidates(track, null);
          if (candidates.some((candidate) => subtitleLangMatchesTarget(candidate, targetLang))) return idx;
        }
        return -1;
      };

      const enforcePreferredHlsSubtitleTrackByPrefs = () => {
        if (hasCodexCanonicalSubtitleTracks()) {
          disableHlsSubtitleTrack();
          return -1;
        }
        if (!state.hls || !Array.isArray(state.hls.subtitleTracks) || !state.hls.subtitleTracks.length) return -1;
        const activeOptionId = String(state.activeSubtitleOptionId || '').trim().toLowerCase();
        if (activeOptionId === 'off') {
          try { state.hls.subtitleTrack = -1; } catch (_) {}
          return -1;
        }
        if (isAssBlockingHlsSubtitles()) {
          disableHlsSubtitleTrack();
          return -1;
        }

        const activeHlsMatch = activeOptionId.match(/^hls:(\d+)$/);
        if (activeHlsMatch?.[1]) {
          const activeHlsIndex = Number(activeHlsMatch[1]);
          if (
            Number.isInteger(activeHlsIndex) &&
            activeHlsIndex >= 0 &&
            activeHlsIndex < state.hls.subtitleTracks.length
          ) {
            const activeHlsTrack = state.hls.subtitleTracks[activeHlsIndex];
            if (!isHlsSubtitleTrackExcluded(activeHlsTrack, activeHlsIndex)) {
              if (Number(state.hls.subtitleTrack) !== activeHlsIndex) {
                try { state.hls.subtitleTrack = activeHlsIndex; } catch (_) {}
              }
              return activeHlsIndex;
            }
          }
        }

        if (activeOptionId.startsWith('native:') || activeOptionId.startsWith('ass:')) {
          return -1;
        }

        const manualIndex = Number(state.manualHlsSubtitleIndex);
        if (
          Number.isInteger(manualIndex) &&
          manualIndex >= 0 &&
          manualIndex < state.hls.subtitleTracks.length
        ) {
          const manualTrack = state.hls.subtitleTracks[manualIndex] || null;
          if (!isHlsSubtitleTrackExcluded(manualTrack, manualIndex)) {
            if (Number(state.hls.subtitleTrack) !== manualIndex) {
              try { state.hls.subtitleTrack = manualIndex; } catch (_) {}
            }
            state.activeSubtitleOptionId = `hls:${manualIndex}`;
            state.pendingHlsSubtitleTargetIndex = manualIndex;
            scheduleHlsSubtitleSync(manualIndex, `hls:${manualIndex}`);
            return manualIndex;
          }
          state.manualHlsSubtitleIndex = null;
        }

        const preferredLang = normalizeSubtitleLangAlias(state.userPrefs?.subtitleLang, { allowOff: true });
        const hasDedicatedManagedAss =
          !!state.assSubtitleUrl &&
          String(state.assSubtitleSource || '').trim().toLowerCase() !== 'hls';
        const managedPrimaryLang = hasDedicatedManagedAss ? getManagedAssPrimaryLang() : null;
        const managedTargetIndex = hasDedicatedManagedAss ? findManagedAssTargetHlsSubtitleIndex() : -1;

        let preferredIndex = -1;
        if (
          hasDedicatedManagedAss &&
          Number.isInteger(managedTargetIndex) &&
          managedTargetIndex >= 0 &&
          preferredLang !== 'off'
        ) {
          const shouldPreferManagedTarget =
            !preferredLang ||
            preferredLang === 'pt-br' ||
            (!!managedPrimaryLang && preferredLang === managedPrimaryLang);
          if (shouldPreferManagedTarget) {
            preferredIndex = managedTargetIndex;
          }
        }

        if (preferredIndex < 0) {
          if (!preferredLang || preferredLang === 'off') return -1;
          preferredIndex = findHlsSubtitleTrackIndexByLang(preferredLang);
        }
        if (preferredIndex < 0) return -1;
        if (Number(state.hls.subtitleTrack) === preferredIndex) return preferredIndex;
        try {
          state.hls.subtitleTrack = preferredIndex;
          state.activeSubtitleOptionId = `hls:${preferredIndex}`;
          state.pendingHlsSubtitleTargetIndex = preferredIndex;
          scheduleHlsSubtitleSync(preferredIndex, `hls:${preferredIndex}`);
          return preferredIndex;
        } catch {
          return -1;
        }
      };

      const collectManagedAssLangCandidates = () => {
        const langs = new Set();
        const addLang = (value) => {
          const normalized = normalizeSubtitleLangAlias(value, { allowOff: true });
          if (normalized && normalized !== 'off') langs.add(normalized);
        };
        addLang(state.assSubtitleMeta?.idioma);
        addLang(state.assSubtitleMeta?.lang);
        const textSources = [
          state.assSubtitleMeta?.label,
          state.assSubtitleUrl
        ];
        textSources.forEach((source) => {
          extractSubtitleLangCandidatesFromText(source).forEach((candidate) => langs.add(candidate));
        });
        return Array.from(langs);
      };

      const getManagedAssPrimaryLang = () => {
        const direct = normalizeSubtitleLangAlias(
          state.assSubtitleMeta?.idioma || state.assSubtitleMeta?.lang,
          { allowOff: true }
        );
        if (direct && direct !== 'off') return direct;
        const fromLabel = extractSubtitleLangCandidatesFromText(state.assSubtitleMeta?.label || '')[0] || null;
        if (fromLabel && fromLabel !== 'off') return fromLabel;
        const fromUrl = extractSubtitleLangCandidatesFromText(state.assSubtitleUrl || '')[0] || null;
        if (fromUrl && fromUrl !== 'off') return fromUrl;
        return null;
      };

      const findManagedAssTargetHlsSubtitleIndex = () => {
        if (!state.hls || !Array.isArray(state.hls.subtitleTracks) || !state.hls.subtitleTracks.length) return -1;

        const managedPrimaryLang = getManagedAssPrimaryLang();
        const byLang = findHlsSubtitleTrackIndexByLang(managedPrimaryLang);
        if (byLang >= 0) return byLang;

        const managedLabel = String(state.assSubtitleMeta?.label || '').trim();
        if (managedLabel) {
          for (let idx = 0; idx < state.hls.subtitleTracks.length; idx += 1) {
            const track = state.hls.subtitleTracks[idx];
            if (isHlsSubtitleTrackExcluded(track, idx)) continue;
            const trackLabel = String(track?.name || track?.label || '').trim();
            if (labelsLikelyReferToSameTrack(trackLabel, managedLabel)) {
              return idx;
            }
          }
        }

        for (let idx = 0; idx < state.hls.subtitleTracks.length; idx += 1) {
          const track = state.hls.subtitleTracks[idx];
          if (isHlsSubtitleTrackExcluded(track, idx)) continue;
          const langCandidates = collectHlsTrackLangCandidates(track, null);
          if (langCandidates.includes('pt-br') || langCandidates.includes('pt-pt')) {
            const token = normalizeSubtitleLabelToken(track?.name || track?.label || '');
            if (!token || token.includes('portug') || token.includes('brasil') || token.includes('brazil') || token.includes('por')) {
              return idx;
            }
          }
        }

        return -1;
      };

      const syncManagedAssDebugDataset = () => {
        syncWatchDebugState();
        if (!playerShell) return;
        const hasManagedAss =
          !!state.assSubtitleUrl &&
          String(state.assSubtitleSource || '').trim().toLowerCase() !== 'hls';
        if (!hasManagedAss) {
          delete playerShell.dataset.assManaged;
          delete playerShell.dataset.assManagedLang;
          delete playerShell.dataset.assManagedTargetIndex;
          return;
        }
        playerShell.dataset.assManaged = '1';
        let managedPrimaryLang = getManagedAssPrimaryLang();
        const managedTargetIndex = findManagedAssTargetHlsSubtitleIndex();
        if (
          !managedPrimaryLang &&
          Number.isInteger(managedTargetIndex) &&
          managedTargetIndex >= 0 &&
          state.hls &&
          Array.isArray(state.hls.subtitleTracks)
        ) {
          const targetTrack = state.hls.subtitleTracks[managedTargetIndex] || null;
          const targetCandidates = collectHlsTrackLangCandidates(targetTrack, null);
          managedPrimaryLang = targetCandidates.find((candidate) => !!candidate && candidate !== 'off') || null;
        }
        playerShell.dataset.assManagedLang = managedPrimaryLang ? String(managedPrimaryLang) : '';
        if (Number.isInteger(managedTargetIndex) && managedTargetIndex >= 0) {
          playerShell.dataset.assManagedTargetIndex = String(managedTargetIndex);
        } else {
          delete playerShell.dataset.assManagedTargetIndex;
        }
      };

      const shouldUseManagedAssForHlsTrack = (track = null, preferredLang = null, hlsIndex = null) => {
        if (!track) return false;
        if (!state.assSubtitleUrl) return false;
        const source = String(state.assSubtitleSource || '').trim().toLowerCase();
        if (source === 'hls') return false;

        const managedTargetIndex = findManagedAssTargetHlsSubtitleIndex();
        let trackIndex = Number(hlsIndex);
        if (!Number.isInteger(trackIndex) || trackIndex < 0) {
          if (state.hls && Array.isArray(state.hls.subtitleTracks)) {
            trackIndex = state.hls.subtitleTracks.indexOf(track);
          } else {
            trackIndex = -1;
          }
        }
        if (
          Number.isInteger(managedTargetIndex) &&
          managedTargetIndex >= 0 &&
          Number.isInteger(trackIndex) &&
          trackIndex >= 0 &&
          trackIndex === managedTargetIndex
        ) {
          return true;
        }

        const trackLangs = collectHlsTrackLangCandidates(track, preferredLang);
        const preferredLangNormalized = normalizeSubtitleLangAlias(preferredLang, { allowOff: true });
        const managedPrimaryLang = getManagedAssPrimaryLang();
        if (
          managedPrimaryLang &&
          managedPrimaryLang !== 'off' &&
          (
            trackLangs.includes(managedPrimaryLang) ||
            preferredLangNormalized === managedPrimaryLang
          )
        ) {
          return true;
        }

        const assLangs = collectManagedAssLangCandidates();
        if (trackLangs.length && assLangs.length) {
          const assLangSet = new Set(assLangs);
          if (trackLangs.some((lang) => assLangSet.has(lang))) return true;
        }

        if (labelsLikelyReferToSameTrack(track?.name || track?.label || '', state.assSubtitleMeta?.label || '')) {
          return true;
        }

        return false;
      };

      const inferActiveHlsSubtitleTrackIndex = () => {
        if (hasCodexCanonicalSubtitleTracks()) return -1;
        if (!state.hls || !Array.isArray(state.hls.subtitleTracks) || !state.hls.subtitleTracks.length) return -1;

        const pendingIndex = Number(state.pendingHlsSubtitleTargetIndex);
        if (Number.isInteger(pendingIndex) && pendingIndex >= 0 && pendingIndex < state.hls.subtitleTracks.length) {
          const pendingTrack = state.hls.subtitleTracks[pendingIndex];
          if (!isHlsSubtitleTrackExcluded(pendingTrack, pendingIndex)) return pendingIndex;
        }

        const activeOptionMatch = String(state.activeSubtitleOptionId || '')
          .trim()
          .toLowerCase()
          .match(/^hls:(\d+)$/);
        if (activeOptionMatch?.[1]) {
          const optionIndex = Number(activeOptionMatch[1]);
          if (Number.isInteger(optionIndex) && optionIndex >= 0 && optionIndex < state.hls.subtitleTracks.length) {
            const optionTrack = state.hls.subtitleTracks[optionIndex];
            if (!isHlsSubtitleTrackExcluded(optionTrack, optionIndex)) return optionIndex;
          }
        }

        const directIndex = Number(state.hls.subtitleTrack);
        if (Number.isInteger(directIndex) && directIndex >= 0 && directIndex < state.hls.subtitleTracks.length) {
          const directTrack = state.hls.subtitleTracks[directIndex];
          if (!isHlsSubtitleTrackExcluded(directTrack, directIndex)) return directIndex;
        }

        const nativeTracks = getSubtitleTracks();
        const showingNativeTrack = nativeTracks.find((track) => {
          try {
            return track?.mode === 'showing';
          } catch {
            return false;
          }
        }) || null;
        if (!showingNativeTrack) return -1;

        const nativeLang = normalizeSubtitleLangAlias(
          showingNativeTrack.language || showingNativeTrack.srclang,
          { allowOff: true }
        );
        if (nativeLang && nativeLang !== 'off') {
          for (let idx = 0; idx < state.hls.subtitleTracks.length; idx += 1) {
            const track = state.hls.subtitleTracks[idx];
            if (isHlsSubtitleTrackExcluded(track, idx)) continue;
            const candidates = collectHlsTrackLangCandidates(track, null);
            if (candidates.includes(nativeLang)) return idx;
          }
        }

        const nativeLabel = String(showingNativeTrack.label || '').trim();
        if (nativeLabel) {
          for (let idx = 0; idx < state.hls.subtitleTracks.length; idx += 1) {
            const track = state.hls.subtitleTracks[idx];
            if (isHlsSubtitleTrackExcluded(track, idx)) continue;
            const trackLabel = String(track?.name || track?.label || '').trim();
            if (labelsLikelyReferToSameTrack(trackLabel, nativeLabel)) return idx;
          }
        }

        return -1;
      };

      const collectTrackSubtitleIndexCandidates = (track, fallbackIndex) => {
        const indexes = new Set();
        const addIndex = (value) => {
          const parsed = parseCodexSubtitleIndexFromValue(value);
          if (Number.isInteger(parsed) && parsed >= 0) indexes.add(parsed);
        };

        addIndex(track?.url);
        addIndex(track?.uri);
        addIndex(track?.subtitleUrl);
        addIndex(track?.path);
        addIndex(track?.details?.url);
        addIndex(track?.details?.playlistUrl);
        addIndex(track?.attrs?.URI);
        addIndex(track?.attrs?.uri);
        addIndex(track?.id);

        const numericFallback = Number(fallbackIndex);
        if (Number.isInteger(numericFallback) && numericFallback >= 0) {
          indexes.add(numericFallback);
        }

        return Array.from(indexes);
      };

      const buildAssCandidateUrlsFromHlsTrack = (track, fallbackIndex) => {
        const sources = [
          track?.url,
          track?.uri,
          track?.subtitleUrl,
          track?.path,
          track?.details?.url,
          track?.details?.playlistUrl,
          track?.attrs?.URI,
          track?.attrs?.uri
        ];
        const indexCandidates = collectTrackSubtitleIndexCandidates(track, fallbackIndex);
        const preferredIndex = Number.isInteger(Number(fallbackIndex))
          ? Number(fallbackIndex)
          : (Number.isInteger(indexCandidates[0]) ? Number(indexCandidates[0]) : null);
        const indexes = preferredIndex !== null
          ? [preferredIndex, ...indexCandidates.filter((idx) => idx !== preferredIndex)]
          : indexCandidates;

        const results = [];
        const seen = new Set();
        const pushUnique = (value = '') => {
          const candidate =
            normalizeAssSubtitleFetchUrl(value || '') ||
            toAbsoluteAssetUrl(value || '') ||
            String(value || '').trim();
          if (!candidate || seen.has(candidate)) return;
          seen.add(candidate);
          results.push(candidate);
        };

        for (const source of sources) {
          const base = String(source || '').trim();
          if (!base) continue;

          for (const idx of indexes) {
            if (!Number.isInteger(idx) || idx < 0) continue;
            const assByIndex = base.replace(
              new RegExp(`sub_${idx}\\.(?:m3u8|vtt)(?=($|[?#]))`, 'i'),
              `sub_${idx}_orig.ass`
            );
            const ssaByIndex = base.replace(
              new RegExp(`sub_${idx}\\.(?:m3u8|vtt)(?=($|[?#]))`, 'i'),
              `sub_${idx}_orig.ssa`
            );
            if (assByIndex !== base) pushUnique(assByIndex);
            if (ssaByIndex !== base) pushUnique(ssaByIndex);
          }

          const genericAss = base.replace(/sub_(\d+)\.(?:m3u8|vtt)(?=($|[?#]))/i, 'sub_$1_orig.ass');
          const genericSsa = base.replace(/sub_(\d+)\.(?:m3u8|vtt)(?=($|[?#]))/i, 'sub_$1_orig.ssa');
          if (genericAss !== base) pushUnique(genericAss);
          if (genericSsa !== base) pushUnique(genericSsa);
        }

        return results;
      };

      const resolveAssSubtitleForHlsTrack = async (track, fallbackIndex) => {
        const cacheKey = Number.isInteger(Number(fallbackIndex))
          ? `idx:${Number(fallbackIndex)}`
          : `raw:${String(track?.name || track?.label || fallbackIndex || '').trim() || 'unknown'}`;
        if (state.hlsAssSubtitleCache instanceof Map && state.hlsAssSubtitleCache.has(cacheKey)) {
          return state.hlsAssSubtitleCache.get(cacheKey);
        }

        const candidates = buildAssCandidateUrlsFromHlsTrack(track, fallbackIndex);
        for (const url of candidates) {
          const absolute = normalizeAssSubtitleFetchUrl(url || '') || toAbsoluteAssetUrl(url || '');
          if (!absolute || !isAssSubtitleUrl(absolute)) continue;
          try {
            const content = await fetchAssSubtitleContentByUrl(absolute);
            if (!String(content || '').trim()) continue;
            const result = { url: absolute, content };
            if (state.hlsAssSubtitleCache instanceof Map) {
              state.hlsAssSubtitleCache.set(cacheKey, result);
            }
            return result;
          } catch (_) {}
        }

        if (state.hlsAssSubtitleCache instanceof Map) {
          state.hlsAssSubtitleCache.set(cacheKey, null);
        }
        return null;
      };

      const fetchAssSubtitleContentByUrl = async (subtitleUrl = '') => {
        const absolute = normalizeAssSubtitleFetchUrl(subtitleUrl || '') || toAbsoluteAssetUrl(subtitleUrl || '');
        if (!absolute || !isAssSubtitleUrl(absolute)) return '';
        const cacheKey = String(absolute || '');
        if (state.assSubtitleContentCache instanceof Map && state.assSubtitleContentCache.has(cacheKey)) {
          return state.assSubtitleContentCache.get(cacheKey) || '';
        }
        const response = await fetch(absolute, {
          method: 'GET',
          credentials: 'same-origin',
          cache: 'no-store'
        });
        if (!response.ok) {
          throw new Error(`ass_fetch_failed_${response.status}`);
        }
        const fetchedBuffer = await response.arrayBuffer();
        const decoded = pickBestDecodedSubtitleCandidate(fetchedBuffer, { preferAss: true });
        const content = String(decoded?.text || '');
        if (state.assSubtitleContentCache instanceof Map) {
          state.assSubtitleContentCache.set(cacheKey, content);
        }
        return content;
      };

      const fetchTextSubtitleContentByUrl = async (subtitleUrl = '') => {
        const absolute = toAbsoluteAssetUrl(subtitleUrl || '');
        if (!absolute || (!isVttSubtitleUrl(absolute) && !isSrtSubtitleUrl(absolute))) return '';
        const cacheKey = `text:${String(absolute || '')}`;
        if (state.assSubtitleContentCache instanceof Map && state.assSubtitleContentCache.has(cacheKey)) {
          return state.assSubtitleContentCache.get(cacheKey) || '';
        }
        const response = await fetch(absolute, {
          method: 'GET',
          credentials: 'same-origin',
          cache: 'no-store'
        });
        if (!response.ok) {
          throw new Error(`text_sub_fetch_failed_${response.status}`);
        }
        const fetchedBuffer = await response.arrayBuffer();
        const decoded = pickBestDecodedSubtitleCandidate(fetchedBuffer, { preferAss: false });
        const content = String(decoded?.text || '');
        if (state.assSubtitleContentCache instanceof Map) {
          state.assSubtitleContentCache.set(cacheKey, content);
        }
        return content;
      };

      const buildAssMetaFromHlsTrack = (track, fallbackIndex = 0) => {
        const label = String(track?.name || track?.label || '').trim() || `Legenda ${Number(fallbackIndex) + 1}`;
        const idioma = String(track?.lang || track?.language || '').trim() || 'pt-BR';
        return {
          label,
          idioma
        };
      };

      const getExcludedCodexSubtitleMatchers = () => {
        const byIndex = new Set();
        const rows = Array.isArray(state.subtitleExclusions) ? state.subtitleExclusions : [];
        const activeVideoId = String(state.currentVideoId || '').trim().toLowerCase();
        rows.forEach((row) => {
          const source = String(row?.source || '').trim().toLowerCase();
          if (!(source === 'codex' || source === 'codex_hls' || source.startsWith('codex_hls') || source.startsWith('codex-hls'))) return;
          const candidateKey = String(row?.candidate_key || '').trim();
          const filePath = String(row?.file_path || '').trim();
          const rowVideoIds = new Set([
            parseCodexVideoIdFromValue(candidateKey),
            parseCodexVideoIdFromValue(filePath)
          ].filter(Boolean));
          if (activeVideoId && rowVideoIds.size > 0 && !rowVideoIds.has(activeVideoId)) return;
          const idxFromKey = parseCodexSubtitleIndexFromValue(candidateKey);
          const idxFromPath = parseCodexSubtitleIndexFromValue(filePath);
          if (Number.isInteger(idxFromKey) && idxFromKey >= 0) byIndex.add(idxFromKey);
          if (Number.isInteger(idxFromPath) && idxFromPath >= 0) byIndex.add(idxFromPath);
        });
        return { byIndex };
      };

      const isHlsSubtitleTrackExcludedStrict = (track, index) => {
        const { byIndex } = getExcludedCodexSubtitleMatchers();
        if (!byIndex.size) return false;
        const indexCandidates = collectTrackSubtitleIndexCandidates(track, index);
        if (indexCandidates.some((candidate) => byIndex.has(candidate))) return true;
        return false;
      };

      const shouldFailOpenHlsSubtitleExclusions = () => {
        if (!state.hls || !Array.isArray(state.hls.subtitleTracks) || !state.hls.subtitleTracks.length) return false;
        const { byIndex } = getExcludedCodexSubtitleMatchers();
        if (!byIndex.size) return false;
        let hasTrack = false;
        for (let idx = 0; idx < state.hls.subtitleTracks.length; idx += 1) {
          const track = state.hls.subtitleTracks[idx];
          if (!track) continue;
          hasTrack = true;
          if (!isHlsSubtitleTrackExcludedStrict(track, idx)) return false;
        }
        return hasTrack;
      };

      const isHlsSubtitleTrackExcluded = (track, index) => {
        // As exclusões de faixas de legenda são aplicadas no backend
        // durante a reescrita do manifesto HLS. No cliente, manter esse
        // filtro causava ocultação indevida de faixas após reenvio.
        return false;
      };

      const enforceExcludedHlsSubtitleSelection = () => {
        if (!state.hls || !Array.isArray(state.hls.subtitleTracks) || !state.hls.subtitleTracks.length) return;
        const current = Number(state.hls.subtitleTrack);
        if (!Number.isFinite(current) || current < 0) return;
        const currentTrack = state.hls.subtitleTracks[current] || null;
        if (!currentTrack) return;
        if (!isHlsSubtitleTrackExcluded(currentTrack, current)) return;
        try {
          state.hls.subtitleTrack = -1;
        } catch (_) {}
      };

      const getFirstAvailableHlsSubtitleIndex = () => {
        if (!state.hls || !Array.isArray(state.hls.subtitleTracks) || !state.hls.subtitleTracks.length) return -1;
        for (let index = 0; index < state.hls.subtitleTracks.length; index += 1) {
          const track = state.hls.subtitleTracks[index];
          if (!isHlsSubtitleTrackExcluded(track, index)) {
            return index;
          }
        }
        return -1;
      };

      function compactTrackDisplayToken(value = '') {
        return String(value || '')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '');
      }

      function getTrackLanguageDisplayName(value = '') {
        const normalized = normalizeSubtitleLangAlias(value, { allowOff: true });
        if (normalized === 'pt-br') return 'Português (Brasil)';
        if (normalized === 'pt-pt' || normalized === 'pt') return 'Português';
        switch ((normalized || '').split('-')[0]) {
          case 'en': return 'English';
          case 'es': return 'Español';
          case 'fr': return 'Français';
          case 'de': return 'Deutsch';
          case 'it': return 'Italiano';
          case 'ru': return 'Русский';
          case 'ar': return 'العربية';
          case 'tr': return 'Türkçe';
          case 'hi': return 'हिन्दी';
          case 'ko': return '한국어';
          case 'zh': return '中文';
          case 'pl': return 'Polski';
          case 'id': return 'Bahasa Indonesia';
          case 'ms': return 'Bahasa Melayu';
          case 'vi': return 'Tiếng Việt';
          case 'th': return 'ไทย';
          case 'ja': return 'Japanese';
          default: return null;
        }
      }

      function stripGenericTrackDisplayPrefix(value = '', kind = 'subtitle') {
        let compact = compactTrackDisplayToken(value);
        if (!compact) return '';
        const prefixes = kind === 'audio'
          ? ['audio', 'faixaaudio', 'audiotrack', 'trackaudio', 'track']
          : ['legenda', 'legendas', 'subtitle', 'subtitles', 'subtitletrack', 'subs', 'sub', 'captions', 'closedcaptions', 'cc', 'track'];
        let changed = true;
        while (changed) {
          changed = false;
          for (const prefix of prefixes) {
            if (compact.startsWith(prefix) && compact.length > prefix.length) {
              compact = compact.slice(prefix.length);
              changed = true;
              break;
            }
          }
        }
        return compact;
      }

      function isLanguageOnlyTrackDisplay(value = '', kind = 'subtitle') {
        const compact = compactTrackDisplayToken(value);
        if (!compact) return false;
        const stripped = stripGenericTrackDisplayPrefix(value, kind);
        const aliases = new Set([
          'pt', 'por', 'pob', 'ptbr', 'ptbrazil', 'portugues', 'portuguese', 'portuguesbr',
          'portuguesbrasil', 'portuguesbrazil', 'portuguesebr', 'portuguesebrazil',
          'portugus', 'portugusbr', 'portugusbrasil', 'ptpt', 'portuguespt',
          'en', 'eng', 'enus', 'english', 'ingles',
          'es', 'spa', 'esp', 'eses', 'espanol', 'spanish', 'latinamericanspanish', 'latinamspanish',
          'fr', 'fra', 'fre', 'frfr', 'french', 'francais', 'franais',
          'de', 'deu', 'ger', 'dede', 'german', 'deutsch',
          'it', 'ita', 'itit', 'italian', 'italiano',
          'ru', 'rus', 'ruru', 'russian',
          'ar', 'ara', 'arsa', 'arabic',
          'tr', 'tur', 'trtr', 'turkish', 'turkce',
          'hi', 'hin', 'hiin', 'hindi',
          'ko', 'kor', 'kokr', 'korean',
          'zh', 'zho', 'chi', 'zhcn', 'zhtw', 'chinese', 'mandarin',
          'pl', 'pol', 'plpl', 'polish', 'polski',
          'id', 'ind', 'idid', 'indonesian', 'bahasaindonesia',
          'ms', 'may', 'msmy', 'malay', 'bahasamelayu',
          'vi', 'vie', 'vivn', 'vietnamese', 'tiengviet',
          'th', 'tha', 'thth', 'thai',
          'ja', 'jp', 'jpn', 'japanese', 'japones'
        ]);
        return aliases.has(compact) || aliases.has(stripped);
      }

      function isGenericTrackDisplayName(value = '', kind = 'subtitle') {
        const compact = compactTrackDisplayToken(value);
        if (!compact) return false;
        if (/^(?:audio|faixaaudio|audiotrack|trackaudio|subtitle|subtitles|subtitletrack|subs|sub|captions|closedcaptions|cc|legenda|legendas|track)\d+$/i.test(compact)) {
          return true;
        }
        const stripped = stripGenericTrackDisplayPrefix(value, kind);
        return !!stripped && /^\d+$/.test(stripped);
      }

      function detectEmbeddedTrackDisplayLanguage(value = '') {
        const raw = String(value || '').trim();
        if (!raw) return null;
        const patterns = [
          [/\bpt[-_ ]?br\b/i, 'pt-br'],
          [/\bpt[-_ ]?pt\b/i, 'pt-pt'],
          [/\ben[-_ ]?us\b/i, 'en'],
          [/\bes[-_ ]?(?:es|419|la)\b/i, 'es'],
          [/\bfr[-_ ]?fr\b/i, 'fr'],
          [/\bde[-_ ]?de\b/i, 'de'],
          [/\bit[-_ ]?it\b/i, 'it'],
          [/\bru[-_ ]?ru\b/i, 'ru'],
          [/\bar[-_ ]?sa\b/i, 'ar'],
          [/\btr[-_ ]?tr\b/i, 'tr'],
          [/\bhi[-_ ]?in\b/i, 'hi'],
          [/\bko[-_ ]?kr\b/i, 'ko'],
          [/\bzh[-_ ]?cn\b/i, 'zh'],
          [/\bzh[-_ ]?tw\b/i, 'zh'],
          [/\bpl[-_ ]?pl\b/i, 'pl'],
          [/\bid[-_ ]?id\b/i, 'id'],
          [/\bms[-_ ]?my\b/i, 'ms'],
          [/\bvi[-_ ]?vn\b/i, 'vi'],
          [/\bth[-_ ]?th\b/i, 'th'],
          [/\bja[-_ ]?jp\b/i, 'ja']
        ];
        for (const [pattern, code] of patterns) {
          if (pattern.test(raw)) return code;
        }
        return null;
      }

      function normalizeQualifiedTrackDisplayLabel(value = '', lang = '') {
        const raw = repairLikelyMojibakeText(String(value || ''))
          .replace(/[_]+/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        if (!raw) return null;
        const compact = compactTrackDisplayToken(raw);
        const normalizedLang =
          normalizeSubtitleLangAlias(lang, { allowOff: true })
          || normalizeSubtitleLangAlias(raw, { allowOff: true });

        if ((normalizedLang || '').startsWith('pt')) {
          if (/\b(?:br|brasil|brazil|brazilian)\b/i.test(raw) || compact.includes('brasil') || compact.includes('brazil')) return 'Português (Brasil)';
          if (/\b(?:pt|portugal)\b/i.test(raw) || compact.includes('portugal')) return 'Português (Portugal)';
        }
        if ((normalizedLang || '').startsWith('es')) {
          if (/\b(?:latam|latin american|latin-american|latino)\b/i.test(raw) || compact.includes('latinamerican')) return 'Español (LatAm)';
          if (/\b(?:european|castilian|espana|españa|spain)\b/i.test(raw) || compact.includes('european')) return 'Español (España)';
        }
        if ((normalizedLang || '').startsWith('en')) {
          if (/\((?:us|usa)\)|\b(?:us|usa|american)\b/i.test(raw)) return 'English (US)';
          if (/\((?:uk|gb)\)|\b(?:uk|british|england)\b/i.test(raw)) return 'English (UK)';
        }
        if ((normalizedLang || '').startsWith('id') || /\b(?:indonesian|bahasa indonesia)\b/i.test(raw)) return 'Bahasa Indonesia';
        if ((normalizedLang || '').startsWith('ms') || /\b(?:malay|bahasa melayu)\b/i.test(raw)) return 'Bahasa Melayu';
        if ((normalizedLang || '').startsWith('vi') || /\b(?:vietnamese|tieng viet)\b/i.test(raw) || compact.includes('tiengviet')) return 'Tiếng Việt';
        if ((normalizedLang || '').startsWith('th') || /\bthai\b/i.test(raw)) return 'ไทย';
        return null;
      }

      function isGeneratedTrackDisplayName(value = '') {
        const raw = repairLikelyMojibakeText(String(value || ''))
          .replace(/[_]+/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        if (!raw) return false;
        const compact = compactTrackDisplayToken(raw);
        if (!compact) return false;
        if (compact === 'defaultaegisubfile' || compact === 'newsubtitles' || compact === 'newsubtitle') return true;
        if (/^default\s+aegisub\s+file$/i.test(raw)) return true;
        if (/^new\s+subtitles?$/i.test(raw)) return true;
        if (/\.(ass|ssa|srt|vtt)$/i.test(raw) && /\bsubtitle\b/i.test(raw)) return true;
        const embeddedLanguage = detectEmbeddedTrackDisplayLanguage(raw);
        if (
          embeddedLanguage &&
          /\.(ass|ssa|srt|vtt)$/i.test(raw) &&
          /(?:\bs\d+(?:\.\d+)?e\d+\b|\bep(?:isode)?[-_ ]?\d+\b|\b\d{4,}\b)/i.test(raw)
        ) {
          return true;
        }
        return false;
      }

      function humanizeTrackDisplayName(value = '', lang = '', { kind = 'subtitle', fallback = '' } = {}) {
        const raw = repairLikelyMojibakeText(String(value || ''))
          .replace(/[_]+/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        const embeddedLang = detectEmbeddedTrackDisplayLanguage(raw);
        const normalizedLang =
          normalizeSubtitleLangAlias(lang, { allowOff: true })
          || normalizeSubtitleLangAlias(embeddedLang, { allowOff: true });
        const normalizedQualified = normalizeQualifiedTrackDisplayLabel(raw, normalizedLang || embeddedLang || '');
        if (normalizedQualified) {
          return normalizedQualified;
        }
        const displayLang = getTrackLanguageDisplayName(raw) || getTrackLanguageDisplayName(normalizedLang || embeddedLang || raw);
        const compact = compactTrackDisplayToken(raw);
        const camelLikeLanguage = !!raw && !raw.includes(' ') && /[A-Z]/.test(raw) && isLanguageOnlyTrackDisplay(raw, kind);
        if (raw && displayLang) {
          if (
            isLanguageOnlyTrackDisplay(raw, kind) ||
            camelLikeLanguage ||
            isGenericTrackDisplayName(raw, kind) ||
            isGeneratedTrackDisplayName(raw) ||
            compact === compactTrackDisplayToken(displayLang)
          ) {
            return displayLang;
          }
        }
        if (raw) return raw;
        if (displayLang) return displayLang;
        return String(fallback || '').trim() || null;
      }

      function extractAssScriptInfo(source = '') {
        const text = String(source || '');
        if (!text.trim()) {
          return {
            title: null,
            playResX: null,
            playResY: null
          };
        }
        const lines = text.split(/\r?\n/);
        let section = '';
        let title = null;
        let playResX = null;
        let playResY = null;

        for (const rawLine of lines) {
          const line = String(rawLine || '').trim();
          if (!line || line.startsWith(';')) continue;
          const sectionMatch = line.match(/^\[([^\]]+)\]$/);
          if (sectionMatch) {
            section = String(sectionMatch[1] || '').trim().toLowerCase();
            continue;
          }
          if (section !== 'script info') continue;
          const infoMatch = line.match(/^([^:]+):\s*(.*)$/);
          if (!infoMatch) continue;
          const key = String(infoMatch[1] || '').trim().toLowerCase();
          const value = String(infoMatch[2] || '').trim();
          if (!value) continue;
          if (key === 'title') {
            title = value;
          } else if (key === 'playresx') {
            const parsed = Number(String(value).replace(',', '.'));
            if (Number.isFinite(parsed) && parsed > 0) playResX = parsed;
          } else if (key === 'playresy') {
            const parsed = Number(String(value).replace(',', '.'));
            if (Number.isFinite(parsed) && parsed > 0) playResY = parsed;
          }
        }

        return {
          title: title ? String(title).trim() : null,
          playResX,
          playResY
        };
      }

      const buildTrackLabel = (track, fallbackPrefix, index) => {
        const kind = String(fallbackPrefix || '').toLowerCase().includes('udio') ? 'audio' : 'subtitle';
        const name = humanizeTrackDisplayName(
          String(track?.name || track?.label || '').trim(),
          String(track?.lang || track?.language || '').trim(),
          { kind, fallback: '' }
        );
        const lang = String(track?.lang || track?.language || '').trim();
        const langDisplay = getTrackLanguageDisplayName(lang);
        if (name) return name;
        if (langDisplay) return langDisplay;
        if (lang) return `${fallbackPrefix} ${lang.toUpperCase()}`;
        return `${fallbackPrefix} ${index + 1}`;
      };

      const saveUserPrivacyPrefs = async (payload = {}) => {
        try {
          const response = await fetch('/api/user/privacy', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'same-origin',
            body: JSON.stringify(payload)
          });
          if (!response.ok) return false;
          const data = await response.json().catch(() => null);
          if (data && typeof data === 'object') {
            if (Object.prototype.hasOwnProperty.call(data, 'autoplay')) {
              state.userPrefs.autoplay = !!data.autoplay;
            }
            if (Object.prototype.hasOwnProperty.call(data, 'preferredAudioLang')) {
              state.userPrefs.audioLang = data.preferredAudioLang || null;
            }
            if (Object.prototype.hasOwnProperty.call(data, 'preferredSubtitleLang')) {
              state.userPrefs.subtitleLang = data.preferredSubtitleLang || null;
            }
          }
          return true;
        } catch {
          return false;
        }
      };

      const isAssSubtitleUrl = (value = '') => {
        const absolute = toAbsoluteAssetUrl(value || '');
        if (!absolute) return false;
        try {
          const pathname = String(new URL(absolute).pathname || '').toLowerCase();
          return /\.ass$/i.test(pathname) || /\.ssa$/i.test(pathname);
        } catch {
          return false;
        }
      };

      const isVttSubtitleUrl = (value = '') => {
        const absolute = toAbsoluteAssetUrl(value || '');
        if (!absolute) return false;
        try {
          return /\.vtt$/i.test(String(new URL(absolute).pathname || ''));
        } catch {
          return false;
        }
      };

      const isSrtSubtitleUrl = (value = '') => {
        const absolute = toAbsoluteAssetUrl(value || '');
        if (!absolute) return false;
        try {
          return /\.srt$/i.test(String(new URL(absolute).pathname || ''));
        } catch {
          return false;
        }
      };

      const isSupportedManagedSubtitleUrl = (value = '') => {
        const raw = String(value || '').trim();
        if (!raw) return false;
        return isAssSubtitleUrl(raw) || isVttSubtitleUrl(raw) || isSrtSubtitleUrl(raw);
      };

      const collectManagedSubtitleCandidates = (watchData = null, { assOnly = false } = {}) => {
        const fromQuery = new URLSearchParams(window.location.search || '').get('sub');
        const exclusions = Array.isArray(watchData?.episode?.subtitle_exclusions)
          ? watchData.episode.subtitle_exclusions
          : [];
        const isExcluded = (candidateUrl = '', source = '') => {
          const normalizedUrl = toAbsoluteAssetUrl(candidateUrl || '');
          if (!normalizedUrl || !isTrustedSubtitleAssetUrl(normalizedUrl)) return false;
          const normalizedSource = String(source || '').trim().toLowerCase();
          if (normalizedSource === 'managed') return false;
          return exclusions.some((row) => {
            if (String(row?.source || '').trim().toLowerCase() !== normalizedSource) return false;
            const rowUrl = toAbsoluteAssetUrl(row?.file_path || '');
            return !!(rowUrl && normalizedUrl && rowUrl === normalizedUrl);
          });
        };
        const candidates = [
          { url: watchData?.episode?.subtitle_meta?.file_path, source: 'managed', idioma: watchData?.episode?.subtitle_meta?.idioma, label: watchData?.episode?.subtitle_meta?.label },
          { url: watchData?.episode?.subtitle_ass_url, source: 'managed', idioma: watchData?.episode?.subtitle_meta?.idioma, label: watchData?.episode?.subtitle_meta?.label },
          { url: watchData?.episode?.ass_url, source: 'managed', idioma: watchData?.episode?.subtitle_meta?.idioma, label: watchData?.episode?.subtitle_meta?.label },
          { url: watchData?.episode?.subtitle_url, source: 'managed', idioma: watchData?.episode?.subtitle_meta?.idioma, label: watchData?.episode?.subtitle_meta?.label },
          { url: watchData?.episode?.legenda_ass, source: 'managed', idioma: watchData?.episode?.subtitle_meta?.idioma, label: watchData?.episode?.subtitle_meta?.label },
          { url: watchData?.episode?.legenda_url, source: 'managed', idioma: watchData?.episode?.subtitle_meta?.idioma, label: watchData?.episode?.subtitle_meta?.label },
          watchData?.player?.subtitle_ass_url,
          watchData?.player?.ass_url,
          watchData?.player?.subtitle_url
        ].map((item) => {
          if (item && typeof item === 'object' && Object.prototype.hasOwnProperty.call(item, 'url')) {
            return item;
          }
          return { url: item, source: '', idioma: '', label: '' };
        });

        if (Array.isArray(watchData?.player?.codex_subtitle_tracks)) {
          watchData.player.codex_subtitle_tracks.forEach((track) => {
            if (!track || typeof track !== 'object') return;
            const idioma = track.idioma || track.language || track.lang || '';
            const label = track.label || track.name || '';
            const source = track.source || 'codex_hls';
            const catalogKey = String(track.key || '').trim() || (
              Number.isInteger(Number(track.index)) && Number(track.index) >= 0
                ? `codex:${Number(track.index)}`
                : ''
            );
            candidates.push({ url: track.subtitle_ass_url, source, idioma, label, catalogKey });
            candidates.push({ url: track.ass_url, source, idioma, label, catalogKey });
            candidates.push({ url: track.legenda_ass, source, idioma, label, catalogKey });
            candidates.push({ url: track.subtitle_url, source, idioma, label, catalogKey });
            candidates.push({ url: track.legenda_url, source, idioma, label, catalogKey });
          });
        }

        if (Array.isArray(watchData?.episode?.audio_options)) {
          watchData.episode.audio_options.forEach((opt) => {
            if (!opt || typeof opt !== 'object') return;
            const idioma = opt.subtitle_lang || opt.subtitle_language || opt.subtitle_locale || opt.subtitle_idioma || opt.lang || opt.language || '';
            const label = opt.subtitle_label || opt.subtitle_name || opt.subtitle_nome || opt.label || opt.nome || '';
            candidates.push({ url: opt.subtitle_ass_url, source: 'audio_options', idioma, label });
            candidates.push({ url: opt.subtitle_url, source: 'audio_options', idioma, label });
            candidates.push({ url: opt.ass_url, source: 'audio_options', idioma, label });
            candidates.push({ url: opt.legenda_ass, source: 'audio_options', idioma, label });
            candidates.push({ url: opt.legenda_url, source: 'audio_options', idioma, label });
          });
        }

        candidates.push({ url: fromQuery, source: '', idioma: '', label: '' });

        const selectedCandidates = [];
        const seenUrls = new Set();
        for (const candidate of candidates) {
          const url = normalizeAssSubtitleFetchUrl(candidate?.url || '') || toAbsoluteAssetUrl(candidate?.url || '');
          if (!url) continue;
          if (!isTrustedSubtitleAssetUrl(url)) continue;
          if (isExcluded(url, candidate?.source || '')) continue;
          if (!isSupportedManagedSubtitleUrl(url)) continue;
          if (assOnly && !isAssSubtitleUrl(url)) continue;
          if (seenUrls.has(url)) continue;
          seenUrls.add(url);
          selectedCandidates.push({
            ...candidate,
            url
          });
        }

        return selectedCandidates;
      };

      const hasCodexWatchSubtitleTracks = (watchData = null) => {
        return !!(
          watchData &&
          Array.isArray(watchData?.player?.codex_subtitle_tracks) &&
          watchData.player.codex_subtitle_tracks.length
        );
      };

      const collectManagedSubtitleUrls = (watchData = null, { assOnly = false } = {}) => {
        return collectManagedSubtitleCandidates(watchData, { assOnly })
          .map((candidate) => normalizeAssSubtitleFetchUrl(candidate?.url || '') || toAbsoluteAssetUrl(candidate?.url || ''))
          .filter(Boolean);
      };

      const pickManagedSubtitleUrl = (watchData = null) => {
        const [first] = collectManagedSubtitleUrls(watchData, { assOnly: false });
        return first || null;
      };

      const pickAssSubtitleUrl = (watchData = null) => {
        const [firstAssSubtitleUrl] = collectManagedSubtitleUrls(watchData, { assOnly: true });
        return firstAssSubtitleUrl || null;
      };

      const pickAssSubtitleMeta = (watchData = null, subtitleUrl = '') => {
        const targetUrl = normalizeAssSubtitleFetchUrl(subtitleUrl || '') || toAbsoluteAssetUrl(subtitleUrl || '');
        if (!targetUrl) return null;

        const normalizeCandidate = (value = '') => normalizeAssSubtitleFetchUrl(value || '') || toAbsoluteAssetUrl(value || '');
        const makeMeta = (labelValue, idiomaValue, contentValue = null) => {
          const label = String(labelValue || '').trim();
          const rawIdioma = String(idiomaValue || '').trim();
          const normalizedIdiomaDirect = normalizeSubtitleLangAlias(rawIdioma, { allowOff: true });
          const normalizedIdiomaFromLabel = extractSubtitleLangCandidatesFromText(label)[0] || null;
          const normalizedIdiomaFromUrl = extractSubtitleLangCandidatesFromText(targetUrl)[0] || null;
          const idioma =
            (normalizedIdiomaDirect && normalizedIdiomaDirect !== 'off' ? normalizedIdiomaDirect : null) ||
            (normalizedIdiomaFromLabel && normalizedIdiomaFromLabel !== 'off' ? normalizedIdiomaFromLabel : null) ||
            (normalizedIdiomaFromUrl && normalizedIdiomaFromUrl !== 'off' ? normalizedIdiomaFromUrl : null) ||
            null;
          const content = typeof contentValue === 'string' ? contentValue : null;
          return {
            label: label || null,
            idioma,
            content: content && content.trim() ? content : null
          };
        };

        const managedMeta = watchData?.episode?.subtitle_meta || null;
        if (managedMeta) {
          const managedCandidates = [
            watchData?.episode?.subtitle_ass_url,
            watchData?.episode?.ass_url,
            watchData?.episode?.subtitle_url,
            watchData?.episode?.legenda_ass,
            watchData?.episode?.legenda_url,
            managedMeta?.file_path
          ]
            .map(normalizeCandidate)
            .filter(Boolean);
          if (managedCandidates.includes(targetUrl)) {
            return makeMeta(managedMeta?.label, managedMeta?.idioma, managedMeta?.content);
          }
        }

        const audioOptions = Array.isArray(watchData?.episode?.audio_options) ? watchData.episode.audio_options : [];
        for (const opt of audioOptions) {
          if (!opt || typeof opt !== 'object') continue;
          const optionCandidates = [
            opt.subtitle_ass_url,
            opt.subtitle_url,
            opt.ass_url,
            opt.legenda_ass,
            opt.legenda_url
          ]
            .map(normalizeCandidate)
            .filter(Boolean);
          if (!optionCandidates.includes(targetUrl)) continue;
          return makeMeta(
            opt.subtitle_label || opt.subtitle_name || opt.subtitle_nome || opt.label || opt.nome,
            opt.subtitle_lang || opt.subtitle_language || opt.subtitle_locale || opt.subtitle_idioma || opt.lang || opt.language,
            null
          );
        }

        const codexTracks = Array.isArray(watchData?.player?.codex_subtitle_tracks)
          ? watchData.player.codex_subtitle_tracks
          : [];
        for (const track of codexTracks) {
          if (!track || typeof track !== 'object') continue;
          const codexCandidates = [
            track.subtitle_ass_url,
            track.ass_url,
            track.legenda_ass,
            track.subtitle_url,
            track.legenda_url
          ]
            .map(normalizeCandidate)
            .filter(Boolean);
          if (!codexCandidates.includes(targetUrl)) continue;
          return makeMeta(
            track.label || track.name || '',
            track.idioma || track.language || track.lang || '',
            typeof track.content === 'string' ? track.content : null
          );
        }

        return null;
      };

      const getSubtitleSourceRank = (value = '') => {
        const source = String(value || '').trim().toLowerCase();
        if (source === 'managed') return 0;
        if (source === 'audio_options') return 10;
        if (source === 'codex_hls' || source === 'codex') return 15;
        if (source === 'native') return 20;
        if (source === 'hls') return 30;
        return 40;
      };

      const getSubtitleLanguageDisplayName = (value = '') => {
        return getTrackLanguageDisplayName(value) || (normalizeSubtitleLangAlias(value, { allowOff: true }) ? String(normalizeSubtitleLangAlias(value, { allowOff: true })).toUpperCase() : 'Legenda');
      };

      const normalizeSubtitleCatalogLang = (value = '', fallbackLabel = '', fallbackUrl = '') => {
        const direct = normalizeSubtitleLangAlias(value, { allowOff: true });
        if (direct && direct !== 'off') return direct;
        const fromLabel = extractSubtitleLangCandidatesFromText(fallbackLabel)[0] || null;
        if (fromLabel && fromLabel !== 'off') return fromLabel;
        const fromUrl = extractSubtitleLangCandidatesFromText(fallbackUrl)[0] || null;
        if (fromUrl && fromUrl !== 'off') return fromUrl;
        return null;
      };

      const buildCanonicalSubtitleLabel = (label = '', lang = '', assTitle = '') => {
        const explicit = humanizeTrackDisplayName(label, lang, { kind: 'subtitle', fallback: '' });
        const parsedAssTitle = humanizeTrackDisplayName(assTitle, lang, { kind: 'subtitle', fallback: '' });
        if (explicit) {
          const explicitCompact = compactTrackDisplayToken(explicit);
          const explicitIsGeneric = isLanguageOnlyTrackDisplay(explicit, 'subtitle');
          if (explicitIsGeneric && parsedAssTitle && compactTrackDisplayToken(parsedAssTitle) !== explicitCompact) {
            return parsedAssTitle;
          }
          return explicit;
        }
        if (parsedAssTitle) return parsedAssTitle;
        return getSubtitleLanguageDisplayName(lang);
      };

      const buildCanonicalSubtitleTrackBaseId = (lang = '', label = '', source = '', catalogKey = '') => {
        const explicitCatalogKey = String(catalogKey || '').trim();
        if (explicitCatalogKey) {
          return `track:${normalizeSubtitleLabelToken(explicitCatalogKey) || 'managed'}`;
        }
        const normalizedLang = normalizeSubtitleCatalogLang(lang, label, source) || 'und';
        const normalizedLabel =
          normalizeSubtitleLabelToken(label) ||
          normalizeSubtitleLabelToken(getSubtitleLanguageDisplayName(lang)) ||
          normalizeSubtitleLabelToken(source) ||
          'subtitle';
        return `track:${normalizedLang}:${normalizedLabel}`;
      };

      const persistStoredSubtitleTrackPreference = (track = null) => {
        const storageKey = buildCurrentSubtitleTrackPreferenceStorageKey();
        if (!storageKey) return false;
        try {
          if (!track || typeof track !== 'object') {
            localStorage.removeItem(storageKey);
            syncWatchDebugState();
            return true;
          }
          localStorage.setItem(storageKey, JSON.stringify({
            id: String(track.id || '').trim() || null,
            catalogKey: String(track.catalogKey || '').trim() || null,
            rawLang: normalizeSubtitleLangAlias(track.rawLang || track.prefLang || '', { allowOff: true }) || null,
            label: String(track.label || '').trim() || null,
            videoId: String(track.videoId || '').trim().toLowerCase() || String(state.currentVideoId || '').trim().toLowerCase() || null,
            savedAt: Date.now()
          }));
          syncWatchDebugState();
          return true;
        } catch {
          return false;
        }
      };

      const clearStoredSubtitleTrackPreference = () => persistStoredSubtitleTrackPreference(null);

      const filterCodexSubtitleTracksForCurrentVideo = (tracks = [], videoId = '') => {
        const targetVideoId = String(videoId || '').trim().toLowerCase();
        if (!targetVideoId || !Array.isArray(tracks) || !tracks.length) {
          return Array.isArray(tracks) ? tracks : [];
        }
        const matching = tracks.filter((track) => getCodexTrackVideoId(track) === targetVideoId);
        return matching.length ? matching : tracks;
      };

      const isExplicitSubtitleCatalogLabel = (value = '') => {
        const label = String(value || '').trim();
        if (!label) return false;
        if (isLanguageOnlyTrackDisplay(label, 'subtitle')) return false;
        if (isGenericTrackDisplayName(label, 'subtitle')) return false;
        return true;
      };

      const cloneCanonicalSubtitleTrack = (track = null) => {
        if (!track || typeof track !== 'object') return null;
        return {
          ...track,
          assCandidateUrls: Array.isArray(track.assCandidateUrls) ? track.assCandidateUrls.slice() : []
        };
      };

      const isEphemeralRuntimeCanonicalSubtitleTrack = (track = null) => {
        if (!track || typeof track !== 'object') return false;
        const source = String(track.source || track.assSource || track.textSource || '').trim().toLowerCase();
        const catalogKey = String(track.catalogKey || '').trim().toLowerCase();
        if (catalogKey.startsWith('codex:') || source === 'codex_hls' || source === 'codex') {
          return false;
        }
        if (source !== 'hls' && source !== 'native') {
          return false;
        }
        return !(track.assUrl || track.textUrl);
      };

      const buildCurrentVideoCodexSubtitleCatalogKey = (index = null) => {
        const numericIndex = Number(index);
        const videoId = String(state.currentVideoId || '').trim().toLowerCase();
        if (!videoId) return '';
        if (!Number.isInteger(numericIndex) || numericIndex < 0) return '';
        return `codex:${videoId}:sub-${numericIndex}`;
      };

      const ensureCanonicalSubtitleTrackId = (catalog = [], track = null) => {
        if (!track) return null;
        if (track.id && !catalog.some((row) => row && row !== track && row.id === track.id)) {
          return track.id;
        }
        const baseId = buildCanonicalSubtitleTrackBaseId(
          track.rawLang || '',
          track.label || '',
          track.source || '',
          track.catalogKey || ''
        );
        let nextId = baseId;
        let suffix = 2;
        while (catalog.some((row) => row && row !== track && row.id === nextId)) {
          nextId = `${baseId}:${suffix}`;
          suffix += 1;
        }
        track.id = nextId;
        return nextId;
      };

      const findMatchingCanonicalSubtitleTrack = (catalog = [], candidate = {}) => {
        const candidateCatalogKey = String(candidate.catalogKey || '').trim();
        if (candidateCatalogKey) {
          const exactCatalogTrack = catalog.find((track) => String(track?.catalogKey || '').trim() === candidateCatalogKey) || null;
          if (exactCatalogTrack) return exactCatalogTrack;
        }
        const targetLang = normalizeSubtitleCatalogLang(candidate.rawLang || candidate.prefLang || '', candidate.label || '', candidate.url || '') || 'und';
        const targetLabel = String(candidate.label || '').trim();
        const targetHasExplicitLabel = isExplicitSubtitleCatalogLabel(targetLabel);
        const sameLangTracks = catalog.filter((track) => {
          const lang = normalizeSubtitleCatalogLang(track?.rawLang || track?.prefLang || '', track?.label || '', track?.assUrl || track?.textUrl || '') || 'und';
          return lang === targetLang;
        });
        if (!sameLangTracks.length) return null;

        if (targetLabel) {
          const labelMatch = sameLangTracks.find((track) => {
            const currentLabel = String(track?.label || '').trim();
            return !!currentLabel && labelsLikelyReferToSameTrack(currentLabel, targetLabel);
          }) || null;
          if (labelMatch) return labelMatch;
        }

        const isExplicitMismatch = (track = null) => {
          if (!targetHasExplicitLabel) return false;
          const currentLabel = String(track?.label || '').trim();
          if (!isExplicitSubtitleCatalogLabel(currentLabel)) return false;
          return !labelsLikelyReferToSameTrack(currentLabel, targetLabel);
        };

        const compatibleSameLangTracks = sameLangTracks.filter((track) => !isExplicitMismatch(track));

        if (compatibleSameLangTracks.length === 1) return compatibleSameLangTracks[0];

        if (candidate.source === 'hls' || candidate.source === 'native') {
          const codexMatches = compatibleSameLangTracks.filter((track) => isCodexCanonicalTrack(track));
          if (codexMatches.length === 1) return codexMatches[0];
        }

        if (candidate.source === 'hls') {
          const managedMatches = compatibleSameLangTracks.filter((track) => !!(track?.assUrl || track?.textUrl));
          if (managedMatches.length === 1) return managedMatches[0];
          const genericMatches = compatibleSameLangTracks.filter((track) => !isExplicitSubtitleCatalogLabel(track?.label || ''));
          if (genericMatches.length === 1) return genericMatches[0];
          return null;
        }

        return compatibleSameLangTracks.find((track) => !String(track?.label || '').trim()) || null;
      };

      const mergeCanonicalSubtitleTrackCandidate = (catalog = [], candidate = {}) => {
        const rawLang = normalizeSubtitleCatalogLang(
          candidate.rawLang || candidate.prefLang || candidate.idioma || candidate.lang || '',
          candidate.label || '',
          candidate.assUrl || candidate.textUrl || candidate.url || ''
        ) || 'und';
        const source = String(candidate.source || 'managed').trim().toLowerCase() || 'managed';
        const sourceRank = getSubtitleSourceRank(source);
        const label = buildCanonicalSubtitleLabel(candidate.label || '', rawLang);
        const candidateCatalogKey = String(candidate.catalogKey || '').trim();
        const isCodexCandidate = source === 'codex_hls' || source === 'codex';
        let track = null;

        if (candidateCatalogKey) {
          track = catalog.find((row) => String(row?.catalogKey || '').trim() === candidateCatalogKey) || null;
        }

        if (!track && !(isCodexCandidate && candidateCatalogKey)) {
          track = findMatchingCanonicalSubtitleTrack(catalog, {
            catalogKey: candidateCatalogKey,
            rawLang,
            label,
            source,
            url: candidate.assUrl || candidate.textUrl || candidate.url || ''
          });
        }

        if (!track) {
          track = {
            id: '',
            label,
            rawLang,
            prefLang: normalizePrivacyLang(rawLang, { allowOff: false }) || rawLang,
            source,
            sourceRank,
            catalogKey: String(candidate.catalogKey || '').trim() || null,
            videoId: String(candidate.videoId || candidate.video_id || '').trim().toLowerCase() || null,
            assUrl: null,
            assInlineContent: '',
            assSource: null,
            assCandidateUrls: [],
            textUrl: null,
            textFormat: null,
            textInlineContent: '',
            textSource: null,
            hlsIndex: null,
            hlsLabel: null,
            nativeIndex: null,
            nativeLabel: null
          };
          ensureCanonicalSubtitleTrackId(catalog, track);
          catalog.push(track);
        }

        if (!track.catalogKey && candidate.catalogKey) {
          track.catalogKey = String(candidate.catalogKey || '').trim() || null;
        }

        if (!track.videoId && (candidate.videoId || candidate.video_id)) {
          track.videoId = String(candidate.videoId || candidate.video_id || '').trim().toLowerCase() || null;
        }

        if (!track.label || sourceRank < Number(track.sourceRank || 999)) {
          track.label = label || track.label || getSubtitleLanguageDisplayName(rawLang);
          track.source = source;
          track.sourceRank = sourceRank;
        }

        const assUrl = normalizeAssSubtitleFetchUrl(candidate.assUrl || '') || toAbsoluteAssetUrl(candidate.assUrl || '');
        if (assUrl && isAssSubtitleUrl(assUrl)) {
          if (!track.assUrl || sourceRank <= Number(track.assSourceRank || 999)) {
            track.assUrl = assUrl;
            track.assInlineContent = String(candidate.assInlineContent || '').trim();
            track.assSource = source;
            track.assSourceRank = sourceRank;
          }
          if (!track.assCandidateUrls.includes(assUrl)) {
            track.assCandidateUrls.push(assUrl);
          }
        }

        const textUrl = toAbsoluteAssetUrl(candidate.textUrl || '');
        if (textUrl && (isVttSubtitleUrl(textUrl) || isSrtSubtitleUrl(textUrl))) {
          if (!track.textUrl || sourceRank <= Number(track.textSourceRank || 999)) {
            track.textUrl = textUrl;
            track.textInlineContent = String(candidate.textInlineContent || '').trim();
            track.textFormat = isSrtSubtitleUrl(textUrl) ? 'srt' : 'vtt';
            track.textSource = source;
            track.textSourceRank = sourceRank;
          }
        }

        if (Number.isInteger(Number(candidate.hlsIndex)) && Number(candidate.hlsIndex) >= 0) {
          track.hlsIndex = Number(candidate.hlsIndex);
          track.hlsLabel = String(candidate.hlsLabel || candidate.label || '').trim() || track.hlsLabel || track.label;
        }

        if (Number.isInteger(Number(candidate.nativeIndex)) && Number(candidate.nativeIndex) >= 0) {
          track.nativeIndex = Number(candidate.nativeIndex);
          track.nativeLabel = String(candidate.nativeLabel || candidate.label || '').trim() || track.nativeLabel || track.label;
        }

        track.prefLang = normalizePrivacyLang(track.rawLang, { allowOff: false }) || track.rawLang;
        return track;
      };

      const syncCanonicalSubtitleCatalog = (tracks = []) => {
        const sanitized = Array.isArray(tracks)
          ? tracks
            .filter((track) => track && typeof track === 'object')
            .map((track) => cloneCanonicalSubtitleTrack(track))
            .filter(Boolean)
          : [];
        sanitized.forEach((track) => ensureCanonicalSubtitleTrackId(sanitized, track));
        state.subtitleCatalog = sanitized;
        state.subtitleCatalogVersion = Number(state.subtitleCatalogVersion || 0) + 1;
        syncWatchDebugState();
        return state.subtitleCatalog;
      };

      const buildCanonicalSubtitleCatalogFromCodexTracks = (watchData = null) => {
        const codexTracks = Array.isArray(watchData?.player?.codex_subtitle_tracks)
          ? watchData.player.codex_subtitle_tracks
          : [];
        if (!codexTracks.length) return [];

        const catalog = [];
        const activeVideoId = String(
          state.currentVideoId
          || watchData?.player?.videoId
          || watchData?.player?.video_id
          || ''
        ).trim().toLowerCase();
        const sortedTracks = filterCodexSubtitleTracksForCurrentVideo(codexTracks, activeVideoId)
          .filter((track) => track && typeof track === 'object')
          .slice()
          .sort((a, b) => {
            const aIndex = Number(a?.index);
            const bIndex = Number(b?.index);
            const aHasIndex = Number.isFinite(aIndex) && aIndex >= 0;
            const bHasIndex = Number.isFinite(bIndex) && bIndex >= 0;
            if (aHasIndex && bHasIndex && aIndex !== bIndex) return aIndex - bIndex;
            if (aHasIndex !== bHasIndex) return aHasIndex ? -1 : 1;
            return String(a?.label || a?.name || '').localeCompare(String(b?.label || b?.name || ''));
          });

        sortedTracks.forEach((track) => {
          const rawLang = normalizeSubtitleCatalogLang(
            track?.idioma || track?.language || track?.lang || '',
            track?.label || track?.name || '',
            track?.subtitle_ass_url || track?.ass_url || track?.legenda_ass || track?.subtitle_url || track?.legenda_url || ''
          ) || 'und';
          const label = buildCanonicalSubtitleLabel(
            track?.label || track?.name || '',
            rawLang,
            ''
          );
          const assUrl = normalizeAssSubtitleFetchUrl(
            track?.subtitle_ass_url || track?.ass_url || track?.legenda_ass || ''
          ) || toAbsoluteAssetUrl(track?.subtitle_ass_url || track?.ass_url || track?.legenda_ass || '');
          const textUrl = !assUrl
            ? (toAbsoluteAssetUrl(track?.subtitle_url || track?.legenda_url || '') || '')
            : '';

          mergeCanonicalSubtitleTrackCandidate(catalog, {
            source: track?.source || 'codex_hls',
            catalogKey: String(track?.key || '').trim() || (
              Number.isInteger(Number(track?.index)) && Number(track.index) >= 0
                ? (activeVideoId ? `codex:${activeVideoId}:sub-${Number(track.index)}` : `codex:${Number(track.index)}`)
                : ''
            ),
            videoId: getCodexTrackVideoId(track),
            rawLang,
            label,
            assUrl,
            assInlineContent: typeof track?.content === 'string' ? track.content : '',
            textUrl,
            textInlineContent: '',
            hlsIndex: null,
            nativeIndex: null
          });
        });

        return catalog;
      };

      const buildCanonicalSubtitleCatalogFromWatchData = (watchData = null) => {
        if (hasCodexWatchSubtitleTracks(watchData)) {
          return buildCanonicalSubtitleCatalogFromCodexTracks(watchData);
        }

        const catalog = [];
        const cacheToken = buildSubtitleCacheToken(
          watchData?.episode?.subtitle_meta?.updated_at
          || watchData?.episode?.subtitle_meta?.id
          || ''
        );
        const candidates = collectManagedSubtitleCandidates(watchData, { assOnly: false });
        candidates.forEach((candidate) => {
          const rawCandidateUrl = toAbsoluteAssetUrl(candidate?.url || '');
          if (!rawCandidateUrl) return;
          const candidateUrl = withSubtitleCacheToken(rawCandidateUrl, cacheToken);
          const meta = pickAssSubtitleMeta(watchData, rawCandidateUrl) || null;
          const rawLang = normalizeSubtitleCatalogLang(
            candidate?.idioma || meta?.idioma || '',
            candidate?.label || meta?.label || '',
            rawCandidateUrl
          ) || 'und';
          const inlineContent = typeof meta?.content === 'string' ? meta.content : '';
          const assInfo = extractAssScriptInfo(inlineContent);
          const label = buildCanonicalSubtitleLabel(
            candidate?.label || meta?.label || '',
            rawLang,
            assInfo?.title || ''
          );
          const assUrl = isAssSubtitleUrl(candidateUrl) ? candidateUrl : '';
          const textUrl = !assUrl && (isVttSubtitleUrl(candidateUrl) || isSrtSubtitleUrl(candidateUrl)) ? candidateUrl : '';

          mergeCanonicalSubtitleTrackCandidate(catalog, {
            source: candidate?.source || 'managed',
            catalogKey: candidate?.catalogKey || '',
            rawLang,
            label,
            assUrl,
            assInlineContent: assUrl ? inlineContent : '',
            textUrl,
            textInlineContent: textUrl ? inlineContent : ''
          });
        });
        return catalog;
      };

      const syncSubtitleCatalogFromWatchData = (watchData = null) => {
        if (!USE_CANONICAL_SUBTITLE_CONTROLLER) return [];
        const catalog = buildCanonicalSubtitleCatalogFromWatchData(watchData);
        return syncCanonicalSubtitleCatalog(catalog);
      };

      const syncSubtitleCatalogFromHlsTracks = () => {
        if (!USE_CANONICAL_SUBTITLE_CONTROLLER) return state.subtitleCatalog;
        const catalog = Array.isArray(state.subtitleCatalog)
          ? state.subtitleCatalog
            .filter((track) => {
              if (isEphemeralRuntimeCanonicalSubtitleTrack(track)) return false;
              const source = String(track?.source || '').trim().toLowerCase();
              return source !== 'hls';
            })
            .map((track) => {
            const cloned = cloneCanonicalSubtitleTrack(track);
            if (cloned) {
              cloned.hlsIndex = null;
              cloned.hlsLabel = null;
            }
            return cloned;
          }).filter(Boolean)
          : [];

        if (state.hls && Array.isArray(state.hls.subtitleTracks)) {
          state.hls.subtitleTracks.forEach((track, index) => {
            if (isHlsSubtitleTrackExcluded(track, index)) return;
            const subtitleIndexCandidates = collectTrackSubtitleIndexCandidates(track, index);
            const subtitleIndex = Number.isInteger(subtitleIndexCandidates[0]) ? subtitleIndexCandidates[0] : index;
            const langs = collectHlsTrackLangCandidates(track, null);
            const rawLang = langs[0] || normalizeSubtitleCatalogLang(track?.lang || track?.language || '', track?.name || track?.label || '', track?.url || '') || 'und';
            const label = buildCanonicalSubtitleLabel(String(track?.name || track?.label || '').trim(), rawLang);
            mergeCanonicalSubtitleTrackCandidate(catalog, {
              source: 'hls',
              catalogKey: buildCurrentVideoCodexSubtitleCatalogKey(subtitleIndex),
              rawLang,
              label,
              hlsIndex: index,
              hlsLabel: label
            });
          });
        }

        if (Array.isArray(state.hlsManifestSubtitleTracks)) {
          state.hlsManifestSubtitleTracks.forEach((track, index) => {
            if (!track || typeof track !== 'object') return;
            const subtitleIndex = Number.isInteger(Number(track?.index)) && Number(track.index) >= 0
              ? Number(track.index)
              : index;
            const langs = collectHlsTrackLangCandidates(track, null);
            const rawLang = langs[0] || normalizeSubtitleCatalogLang(track?.lang || track?.language || '', track?.name || track?.label || '', track?.textUrl || track?.url || '') || 'und';
            const label = buildCanonicalSubtitleLabel(String(track?.name || track?.label || '').trim(), rawLang);
            mergeCanonicalSubtitleTrackCandidate(catalog, {
              source: 'hls',
              catalogKey: buildCurrentVideoCodexSubtitleCatalogKey(subtitleIndex),
              rawLang,
              label,
              textUrl: track?.textUrl || '',
              textInlineContent: '',
              hlsLabel: label,
              nativeIndex: null,
              hlsIndex: null
            });
          });
        }

        syncCanonicalSubtitleCatalog(catalog);
        return state.subtitleCatalog;
      };

      const syncSubtitleCatalogFromNativeTracks = () => {
        if (!USE_CANONICAL_SUBTITLE_CONTROLLER) return state.subtitleCatalog;
        const catalog = Array.isArray(state.subtitleCatalog)
          ? state.subtitleCatalog
            .filter((track) => {
              if (isEphemeralRuntimeCanonicalSubtitleTrack(track)) return false;
              const source = String(track?.source || '').trim().toLowerCase();
              return source !== 'native';
            })
            .map((track) => {
            const cloned = cloneCanonicalSubtitleTrack(track);
            if (cloned) {
              cloned.nativeIndex = null;
              cloned.nativeLabel = null;
            }
            return cloned;
          }).filter(Boolean)
          : [];
        const dynamicTrack = getAssFallbackTextTrack();
        const nativeTracks = getSubtitleTracks().filter((track) => track && track !== dynamicTrack);
        nativeTracks.forEach((track, index) => {
          const rawLang = normalizeSubtitleCatalogLang(track?.language || track?.srclang || '', track?.label || '', '') || 'und';
          const label = buildCanonicalSubtitleLabel(track?.label || '', rawLang);
          mergeCanonicalSubtitleTrackCandidate(catalog, {
            source: 'native',
            rawLang,
            label,
            nativeIndex: index,
            nativeLabel: label
          });
        });
        syncCanonicalSubtitleCatalog(catalog);
        return state.subtitleCatalog;
      };

      const getCanonicalSubtitleTracks = () => {
        if (!USE_CANONICAL_SUBTITLE_CONTROLLER) return [];
        return Array.isArray(state.subtitleCatalog) ? state.subtitleCatalog.slice() : [];
      };

      const isCodexCanonicalTrack = (track = null) => {
        if (!track || typeof track !== 'object') return false;
        const source = String(track.source || track.assSource || track.textSource || '').trim().toLowerCase();
        if (source === 'codex_hls' || source === 'codex') return true;
        const catalogKey = String(track.catalogKey || '').trim().toLowerCase();
        return catalogKey.startsWith('codex:');
      };

      const hasCodexCanonicalSubtitleTracks = () => {
        return getCanonicalSubtitleTracks().some((track) => isCodexCanonicalTrack(track));
      };

      const findCanonicalSubtitleTrackById = (trackId = '') => {
        const targetId = String(trackId || '').trim();
        if (!targetId) return null;
        return getCanonicalSubtitleTracks().find((track) => String(track?.id || '') === targetId) || null;
      };

      const findCanonicalSubtitleTrackByStoredPreference = () => {
        const stored = readStoredSubtitleTrackPreference();
        if (!stored || typeof stored !== 'object') return null;

        const targetVideoId = String(state.currentVideoId || '').trim().toLowerCase();
        const storedVideoId = String(stored.videoId || '').trim().toLowerCase();
        if (targetVideoId && storedVideoId && storedVideoId !== targetVideoId) {
          return null;
        }

        const storedCatalogKey = String(stored.catalogKey || '').trim();
        if (storedCatalogKey) {
          const byCatalogKey = getCanonicalSubtitleTracks().find((track) => {
            return String(track?.catalogKey || '').trim() === storedCatalogKey;
          }) || null;
          if (byCatalogKey) return byCatalogKey;
        }

        const storedId = String(stored.id || '').trim();
        if (storedId) {
          const byId = findCanonicalSubtitleTrackById(storedId);
          if (byId) return byId;
        }

        const storedLang = normalizeSubtitleLangAlias(stored.rawLang || '', { allowOff: true });
        if (storedLang && storedLang !== 'off') {
          return findCanonicalSubtitleTrackByLang(storedLang);
        }

        return null;
      };

      const findCanonicalSubtitleTrackByLang = (lang = '') => {
        const targetLang = normalizeSubtitleLangAlias(lang, { allowOff: true });
        if (!targetLang || targetLang === 'off') return null;
        const exactMatch = getCanonicalSubtitleTracks().find((track) => {
          return subtitleLangEqualsTarget(track?.rawLang || track?.prefLang || '', targetLang);
        }) || null;
        if (exactMatch) return exactMatch;
        return getCanonicalSubtitleTracks().find((track) => {
          return subtitleLangMatchesTarget(track?.rawLang || track?.prefLang || '', targetLang);
        }) || null;
      };

      const getDefaultCanonicalSubtitleTrack = () => {
        const tracks = getCanonicalSubtitleTracks();
        if (!tracks.length) return null;
        const preferredLang = normalizeSubtitleLangAlias(state.userPrefs?.subtitleLang, { allowOff: true });
        if (preferredLang === 'off') return null;
        const storedTrack = findCanonicalSubtitleTrackByStoredPreference();
        if (storedTrack) return storedTrack;
        if (preferredLang) {
          return findCanonicalSubtitleTrackByLang(preferredLang);
        }
        return tracks.find((track) => Number(track?.sourceRank || 999) <= 10)
          || findCanonicalSubtitleTrackByLang('pt-br')
          || tracks[0]
          || null;
      };

      const setSubtitleRuntimeState = (trackId = null, mode = 'off', styleTrackId = null) => {
        state.subtitleRuntimeTrackId = trackId || null;
        state.subtitleRuntimeMode = String(mode || 'off');
        state.subtitleStyleTrackId = styleTrackId || null;
        syncWatchDebugState();
      };

      const isCanonicalSubtitleRuntimeActiveForTrack = (track = null) => {
        if (!track || !state.subtitleRuntimeTrackId || state.subtitleRuntimeTrackId !== track.id) return false;
        const mode = String(state.subtitleRuntimeMode || 'off');
        if (mode === 'ass') {
          return !!(state.assRenderer && state.assSubtitleEnabled);
        }
        if (mode === 'ass-fallback' || mode === 'dynamic') {
          const dynamicTrack = getAssFallbackTextTrack();
          return !!(dynamicTrack && dynamicTrack.mode === 'showing');
        }
        if (mode === 'hls') {
          return Number.isInteger(Number(track.hlsIndex)) && Number(state.hls?.subtitleTrack) === Number(track.hlsIndex);
        }
        if (mode === 'native') {
          const dynamicTrack = getAssFallbackTextTrack();
          const nativeTracks = getSubtitleTracks().filter((row) => row && row !== dynamicTrack);
          const nativeTrack = nativeTracks[Number(track.nativeIndex)] || null;
          return !!(nativeTrack && nativeTrack.mode === 'showing');
        }
        return false;
      };

      const deactivateCanonicalSubtitleOutputs = () => {
        clearSubtitleReconcileTimer();
        clearHlsSubtitleSyncTimers();
        state.assAutoAttachPending = false;
        state.assAutoAttachLastKey = '';
        state.assAutoAttachLastAt = 0;
        state.assInitRetryPending = false;
        state.pendingHlsSubtitleTargetIndex = null;
        state.manualHlsSubtitleIndex = null;
        disableHlsSubtitleTrack();
        setHlsSubtitleDisplay(false);
        destroyAssRenderer({ preserveSelection: true });
        state.assSubtitleCandidates = [];
        getSubtitleTracks().forEach((track) => {
          try {
            track.mode = 'disabled';
          } catch (_) {}
        });
        state.assFallbackOptionId = null;
        setNativeVttCueStyleActive(false);
        setSubtitleRuntimeState(null, 'off', null);
      };

      const waitForCanonicalSubtitleRuntime = async (track = null, expectedEpoch = null) => {
        const isReady = () => {
          if (!track) return false;
          if (state.assRenderer && state.assSubtitleEnabled) return true;
          const dynamicTrack = getAssFallbackTextTrack();
          if (dynamicTrack && dynamicTrack.mode === 'showing') return true;
          if (Number.isInteger(Number(track.hlsIndex)) && Number(track.hlsIndex) >= 0) {
            if (Number(state.hls?.subtitleTrack) === Number(track.hlsIndex)) return true;
          }
          if (Number.isInteger(Number(track.nativeIndex)) && Number(track.nativeIndex) >= 0) {
            const nativeTracks = getSubtitleTracks().filter((row) => row && row !== dynamicTrack);
            const nativeTrack = nativeTracks[Number(track.nativeIndex)] || null;
            if (nativeTrack && nativeTrack.mode === 'showing') return true;
          }
          return false;
        };
        const delays = [0, 60, 140, 260, 420, 700, 1000];
        for (const delay of delays) {
          if (delay > 0) {
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
          if (Number.isFinite(Number(expectedEpoch)) && !isSubtitleSelectionEpochCurrent(Number(expectedEpoch))) {
            return false;
          }
          if (isReady()) {
            return true;
          }
        }
        return false;
      };

      const activateCanonicalHlsTrack = (track = null) => {
        const hlsIndex = Number(track?.hlsIndex);
        if (!track || !state.hls || !Number.isInteger(hlsIndex) || hlsIndex < 0) return false;
        state.assFallbackOptionId = null;
        state.manualHlsSubtitleIndex = hlsIndex;
        state.pendingHlsSubtitleTargetIndex = hlsIndex;
        setHlsSubtitleDisplay(true);
        try {
          if (Number(state.hls.subtitleTrack) !== hlsIndex) {
            state.hls.subtitleTrack = hlsIndex;
          }
        } catch (_) {}
        scheduleHlsSubtitleSync(hlsIndex);
        syncNativeTrackWithHlsSubtitleIndex(hlsIndex);
        setSubtitleRuntimeState(track.id, 'hls', null);
        return true;
      };

      const activateCanonicalNativeTrackByIndex = (track = null) => {
        const targetIndex = Number(track?.nativeIndex);
        if (!track || !Number.isInteger(targetIndex) || targetIndex < 0) return false;
        const dynamicTrack = getAssFallbackTextTrack();
        const nativeTracks = getSubtitleTracks().filter((row) => row && row !== dynamicTrack);
        const selectedTrack = nativeTracks[targetIndex] || null;
        if (!selectedTrack) return false;
        nativeTracks.forEach((row, index) => {
          try {
            row.mode = index === targetIndex ? 'showing' : 'disabled';
          } catch (_) {}
        });
        forceShowTextTrack(selectedTrack);
        state.assFallbackOptionId = null;
        setSubtitleRuntimeState(track.id, 'native', null);
        return true;
      };

      const activateCanonicalDynamicTrack = async (track = null) => {
        if (!track || !track.textUrl) return false;
        if (track.assUrl) {
          await primeAssCueStyleProfile(track.assUrl, track.assInlineContent || '').catch(() => false);
        } else {
          resetAssFallbackCueStyle();
        }
        const built = await buildNativeSubtitleTrack(
          track.textUrl,
          {
            label: track.label,
            idioma: track.rawLang || track.prefLang || 'und',
            source: track.textSource || track.source || 'managed'
          },
          track.textInlineContent || ''
        );
        if (!built) return false;
        const dynamicTrack = getAssFallbackTextTrack();
        if (!dynamicTrack) return false;
        try {
          dynamicTrack.mode = 'showing';
        } catch (_) {}
        state.assFallbackOptionId = track.id;
        setSubtitleRuntimeState(track.id, 'dynamic', track.assUrl ? track.id : null);
        return true;
      };

      const getActiveCanonicalSubtitleTrack = () => {
        const activeId = String(state.activeSubtitleOptionId || state.subtitleRuntimeTrackId || '').trim();
        if (!activeId || activeId.toLowerCase() === 'off') return null;
        return findCanonicalSubtitleTrackById(activeId) || null;
      };

      const activateCanonicalNonAssFallback = async (track = null, overrides = {}) => {
        if (!track) return false;
        const fallbackTrack = {
          ...track,
          assUrl: String(overrides?.assUrl || track.assUrl || '').trim(),
          assInlineContent: String(overrides?.assInlineContent || track.assInlineContent || '').trim()
        };

        if (fallbackTrack.textUrl) {
          const dynamicReady = await activateCanonicalDynamicTrack(fallbackTrack);
          if (dynamicReady) return true;
        }

        if (isCodexCanonicalTrack(fallbackTrack)) {
          return false;
        }

        if (activateCanonicalHlsTrack(fallbackTrack)) return true;
        if (activateCanonicalNativeTrackByIndex(fallbackTrack)) return true;
        return false;
      };

      const shouldPreferAssCssFallbackForTrack = () => false;

      const persistResolvedCanonicalAssVariant = (trackId = '', assUrl = '', assContent = '') => {
        const safeUrl = normalizeAssSubtitleFetchUrl(assUrl || '') || toAbsoluteAssetUrl(assUrl || '');
        if (!trackId || !safeUrl) return;
        const assInfo = extractAssScriptInfo(String(assContent || '').trim());
        state.subtitleCatalog = getCanonicalSubtitleTracks().map((track) => {
          if (String(track?.id || '') !== String(trackId)) return track;
          const nextTrack = cloneCanonicalSubtitleTrack(track);
          if (!nextTrack) return track;
          nextTrack.assUrl = safeUrl;
          nextTrack.assInlineContent = String(assContent || '').trim();
          nextTrack.assSource = nextTrack.assSource || 'hls';
          if (!nextTrack.assCandidateUrls.includes(safeUrl)) {
            nextTrack.assCandidateUrls.push(safeUrl);
          }
          const improvedLabel = buildCanonicalSubtitleLabel(
            nextTrack.label || nextTrack.hlsLabel || nextTrack.nativeLabel || '',
            nextTrack.rawLang || nextTrack.prefLang || '',
            assInfo?.title || ''
          );
          if (improvedLabel) {
            nextTrack.label = improvedLabel;
            if (!nextTrack.hlsLabel || isLanguageOnlyTrackDisplay(nextTrack.hlsLabel, 'subtitle') || isGenericTrackDisplayName(nextTrack.hlsLabel, 'subtitle')) {
              nextTrack.hlsLabel = improvedLabel;
            }
            if (!nextTrack.nativeLabel || isLanguageOnlyTrackDisplay(nextTrack.nativeLabel, 'subtitle') || isGenericTrackDisplayName(nextTrack.nativeLabel, 'subtitle')) {
              nextTrack.nativeLabel = improvedLabel;
            }
          }
          return nextTrack;
        });
        syncWatchDebugState();
      };

      const activateCanonicalSubtitleTrackRuntime = async (track = null, expectedEpoch = null) => {
        if (!track) return false;
        deactivateCanonicalSubtitleOutputs();

        let assUrl = normalizeAssSubtitleFetchUrl(track.assUrl || '') || toAbsoluteAssetUrl(track.assUrl || '');
        let assInlineContent = String(track.assInlineContent || '').trim();
        let assSource = String(track.assSource || track.source || 'managed').trim() || 'managed';
        const assCandidateUrls = Array.isArray(track.assCandidateUrls)
          ? track.assCandidateUrls
            .map((candidateUrl) => normalizeAssSubtitleFetchUrl(candidateUrl || '') || toAbsoluteAssetUrl(candidateUrl || ''))
            .filter(Boolean)
          : [];
        let canTryGeneratedAssFallback = false;

        if (!assUrl && Number.isInteger(Number(track.hlsIndex)) && Number(track.hlsIndex) >= 0 && state.hls && Array.isArray(state.hls.subtitleTracks)) {
          const hlsTrack = state.hls.subtitleTracks[Number(track.hlsIndex)] || null;
          if (hlsTrack) {
            const resolvedAss = await resolveAssSubtitleForHlsTrack(hlsTrack, Number(track.hlsIndex)).catch(() => null);
            if (resolvedAss?.url) {
              assUrl = normalizeAssSubtitleFetchUrl(resolvedAss.url || '') || toAbsoluteAssetUrl(resolvedAss.url || '');
              assInlineContent = String(resolvedAss.content || '').trim();
              assSource = 'hls';
              persistResolvedCanonicalAssVariant(track.id, assUrl, assInlineContent);
            }
          }
        }

        if (assUrl && isAssSubtitleUrl(assUrl) && !String(assInlineContent || '').trim()) {
          const fetchedAssContent = await fetchAssSubtitleContentByUrl(assUrl).catch(() => '');
          if (String(fetchedAssContent || '').trim()) {
            assInlineContent = String(fetchedAssContent || '').trim();
            persistResolvedCanonicalAssVariant(track.id, assUrl, assInlineContent);
          }
        }

        const hasResolvedOriginalAss =
          !!(assUrl && isAssSubtitleUrl(assUrl) && /_orig\.(ass|ssa)(?:$|[?#])/i.test(assUrl));

        if (assUrl && isAssSubtitleUrl(assUrl)) {
          const preferCssFallback = shouldPreferAssCssFallbackForTrack(assUrl, assSource, track);
          const rendererBlockedForTrack =
            preferCssFallback ||
            ASS_RENDERER_FORCE_FALLBACK ||
            state.assCspBlocked ||
            state.assRendererDisabled ||
            !ASS_WASM_SUPPORTED ||
            typeof window.SubtitlesOctopus !== 'function' ||
            hasAssRendererTrackFailure(assUrl);
          state.assSubtitleUrl = assUrl;
          state.assSubtitleMeta = {
            label: track.label,
            idioma: track.rawLang || track.prefLang || 'und',
            content: assInlineContent || '',
            source: assSource,
            candidateUrls: assCandidateUrls.length ? assCandidateUrls.slice() : [assUrl]
          };
          state.assSubtitleSource = assSource;
          state.assSubtitleCandidates = assCandidateUrls.length ? assCandidateUrls.slice() : [assUrl];
          canTryGeneratedAssFallback = true;

          if (!rendererBlockedForTrack) {
            const started = initAssRenderer(assUrl, state.assSubtitleMeta, expectedEpoch);
            if (started && state.assRenderer && state.assSubtitleEnabled) {
              state.assFallbackOptionId = null;
              setSubtitleRuntimeState(track.id, 'ass', track.id);
              return true;
            }

            const assReady = await waitForCanonicalSubtitleRuntime(track, expectedEpoch);
            if (assReady) {
              if (state.assRenderer && state.assSubtitleEnabled) {
                setSubtitleRuntimeState(track.id, 'ass', track.id);
              } else {
                state.assFallbackOptionId = track.id;
                setSubtitleRuntimeState(track.id, 'ass-fallback', track.id);
              }
              return true;
            }
          }
        }

        if (canTryGeneratedAssFallback && assUrl) {
          const generatedFallbackReady = await buildAssFallbackTrack(
            assUrl,
            {
              label: track.label,
              idioma: track.rawLang || track.prefLang || 'und',
              content: assInlineContent || '',
              source: assSource,
              candidateUrls: Array.isArray(track.assCandidateUrls) && track.assCandidateUrls.length
                ? track.assCandidateUrls.slice()
                : [assUrl]
            },
            assInlineContent || '',
            expectedEpoch
          );
          if (generatedFallbackReady) {
            state.assFallbackOptionId = track.id;
            setSubtitleRuntimeState(track.id, 'ass-fallback', track.id);
            return true;
          }
        }

        const nonAssFallbackReady = await activateCanonicalNonAssFallback(track, {
          assUrl,
          assInlineContent
        });
        if (nonAssFallbackReady) return true;

        setSubtitleRuntimeState(null, 'off', null);
        return false;
      };

      const scheduleCanonicalSubtitleReconcile = (reason = 'sync', delayMs = 0) => {
        if (!USE_CANONICAL_SUBTITLE_CONTROLLER) return;
        clearSubtitleReconcileTimer();
        state.subtitleReconcileTimer = setTimeout(() => {
          state.subtitleReconcileTimer = null;
          reconcileCanonicalSubtitleSelection(reason).catch(() => null);
        }, Math.max(0, Number(delayMs) || 0));
      };

      const ensureCanonicalSubtitleSelectionInitialized = async (reason = 'init') => {
        if (!USE_CANONICAL_SUBTITLE_CONTROLLER) return false;
        const activeId = String(state.activeSubtitleOptionId || '').trim();
        if (activeId === 'off') {
          state.subtitleInitialSelectionApplied = true;
          applyCaptionState();
          return true;
        }

        const existingTrack = activeId ? findCanonicalSubtitleTrackById(activeId) : null;
        if (existingTrack) {
          state.subtitleInitialSelectionApplied = true;
          if (!isCanonicalSubtitleRuntimeActiveForTrack(existingTrack)) {
            await activateCanonicalSubtitleTrackRuntime(existingTrack, Number(state.subtitleSelectionEpoch || 0));
          }
          applyCaptionState();
          return true;
        }

        const preferredLang = normalizeSubtitleLangAlias(state.userPrefs?.subtitleLang, { allowOff: true });
        const preferredTrack = getDefaultCanonicalSubtitleTrack();
        if (preferredLang && preferredLang !== 'off' && !preferredTrack) {
          return false;
        }
        if (!preferredTrack) {
          applyCaptionState();
          return false;
        }

        state.subtitleInitialSelectionApplied = true;
        await applySubtitleSelection({
          id: preferredTrack.id,
          type: 'track',
          label: preferredTrack.label,
          prefLang: preferredTrack.prefLang,
          track: preferredTrack
        });
        return true;
      };

      const reconcileCanonicalSubtitleSelection = async (reason = 'sync') => {
        if (!USE_CANONICAL_SUBTITLE_CONTROLLER) return false;
        syncSubtitleCatalogFromHlsTracks();
        syncSubtitleCatalogFromNativeTracks();

        const activeId = String(state.activeSubtitleOptionId || '').trim();
        if (!activeId) {
          return ensureCanonicalSubtitleSelectionInitialized(reason);
        }
        if (activeId.toLowerCase() === 'off') {
          applyCaptionState();
          renderSettingsPopoverAuto();
          return true;
        }

        const activeTrack = findCanonicalSubtitleTrackById(activeId);
        if (!activeTrack) {
          state.activeSubtitleOptionId = null;
          return ensureCanonicalSubtitleSelectionInitialized(reason);
        }

        if (!isCanonicalSubtitleRuntimeActiveForTrack(activeTrack)) {
          await activateCanonicalSubtitleTrackRuntime(activeTrack, Number(state.subtitleSelectionEpoch || 0));
        } else if (String(state.subtitleRuntimeMode || '') === 'hls' && Number.isInteger(Number(activeTrack.hlsIndex))) {
          activateCanonicalHlsTrack(activeTrack);
        }

        applyCaptionState();
        renderSettingsPopoverAuto();
        return true;
      };

      let assFallbackCueStyleEl = null;
      let assFallbackCueStyleProfile = null;

      const ensureAssFallbackCueStyleEl = () => {
        if (assFallbackCueStyleEl && assFallbackCueStyleEl.isConnected) return assFallbackCueStyleEl;
        const styleEl = document.createElement('style');
        styleEl.id = 'ass-fallback-cue-style';
        document.head.appendChild(styleEl);
        assFallbackCueStyleEl = styleEl;
        return assFallbackCueStyleEl;
      };

      const escapeCssString = (value = '') => String(value || '')
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"');

      const formatCssFontFamily = (value = '') => {
        const raw = String(value || '').trim();
        if (!raw) return '"Arial", sans-serif';
        const safe = `"${escapeCssString(raw)}"`;
        return `${safe}, sans-serif`;
      };

      const parseAssNumber = (value, fallback = 0) => {
        const raw = String(value ?? '').trim().replace(',', '.');
        if (!raw) return Number(fallback) || 0;
        const num = Number(raw);
        return Number.isFinite(num) ? num : (Number(fallback) || 0);
      };

      const parseAssBoolean = (value) => {
        const raw = String(value ?? '').trim().toLowerCase();
        if (!raw) return false;
        const num = Number(raw);
        if (Number.isFinite(num)) return num !== 0;
        return raw === 'true' || raw === 'yes' || raw === 'on';
      };

      const parseAssHexColor = (value = '', fallback = 'rgba(255, 255, 255, 1)') => {
        const cleaned = String(value || '')
          .trim()
          .replace(/^&H/i, '')
          .replace(/[^0-9a-f]/gi, '');
        if (!cleaned) return fallback;
        const padded = cleaned.padStart(8, '0').slice(-8);
        const aa = parseInt(padded.slice(0, 2), 16);
        const bb = parseInt(padded.slice(2, 4), 16);
        const gg = parseInt(padded.slice(4, 6), 16);
        const rr = parseInt(padded.slice(6, 8), 16);
        if (![aa, bb, gg, rr].every((num) => Number.isFinite(num))) return fallback;
        const alpha = Math.max(0, Math.min(1, 1 - (aa / 255)));
        const alphaText = alpha.toFixed(3).replace(/\.?0+$/, '');
        return `rgba(${rr}, ${gg}, ${bb}, ${alphaText || '0'})`;
      };

      const buildDefaultAssStyleProfile = () => ({
        fontName: 'Arial',
        fontSize: 40,
        bold: false,
        italic: false,
        underline: false,
        strikeOut: false,
        primaryColor: 'rgba(255, 255, 255, 1)',
        outlineColor: 'rgba(0, 0, 0, 1)',
        shadowColor: 'rgba(0, 0, 0, 0.88)',
        outline: 2,
        shadow: 1.6,
        alignment: 2,
        marginL: 10,
        marginR: 10,
        marginV: 30,
        playResX: 1920,
        playResY: 1080
      });

      const parseAssStyleProfile = (source = '') => {
        const text = String(source || '');
        if (!text.trim()) return null;

        const lines = text.split(/\r?\n/);
        let section = '';
        let styleFormat = [];
        let firstStyle = null;
        let defaultStyle = null;
        const scriptInfo = {
          playresx: 1920,
          playresy: 1080
        };

        const splitAssValues = (raw = '', expectedCount = 0) => {
          if (!expectedCount || expectedCount < 2) return String(raw || '').split(',');
          const parts = [];
          let current = '';
          let commaCount = 0;
          for (const ch of String(raw || '')) {
            if (ch === ',' && commaCount < expectedCount - 1) {
              parts.push(current);
              current = '';
              commaCount += 1;
            } else {
              current += ch;
            }
          }
          parts.push(current);
          return parts;
        };

        for (const rawLine of lines) {
          const line = String(rawLine || '').trim();
          if (!line || line.startsWith(';')) continue;

          const sectionMatch = line.match(/^\[([^\]]+)\]$/);
          if (sectionMatch) {
            section = String(sectionMatch[1] || '').trim().toLowerCase();
            continue;
          }

          if (section === 'script info') {
            const infoMatch = line.match(/^([^:]+):\s*(.+)$/);
            if (!infoMatch) continue;
            const key = String(infoMatch[1] || '').trim().toLowerCase();
            const value = String(infoMatch[2] || '').trim();
            if (key === 'playresx') scriptInfo.playresx = Math.max(1, parseAssNumber(value, 1920));
            if (key === 'playresy') scriptInfo.playresy = Math.max(1, parseAssNumber(value, 1080));
            continue;
          }

          if (section !== 'v4+ styles' && section !== 'v4 styles') continue;

          if (/^format\s*:/i.test(line)) {
            styleFormat = line
              .replace(/^format\s*:/i, '')
              .split(',')
              .map((part) => String(part || '').trim().toLowerCase());
            continue;
          }

          if (!/^style\s*:/i.test(line)) continue;
          const styleRaw = line.replace(/^style\s*:/i, '').trim();
          const values = splitAssValues(styleRaw, styleFormat.length);
          const styleMap = {};
          styleFormat.forEach((field, index) => {
            styleMap[field] = String(values[index] || '').trim();
          });
          if (!firstStyle) firstStyle = styleMap;
          if (String(styleMap.name || '').trim().toLowerCase() === 'default') {
            defaultStyle = styleMap;
          }
        }

        const style = defaultStyle || firstStyle;
        if (!style) return null;

        const fontSize = Math.max(10, parseAssNumber(style.fontsize, 40));
        const alignment = Math.min(9, Math.max(1, Math.round(parseAssNumber(style.alignment, 2))));
        return {
          fontName: String(style.fontname || 'Arial').trim() || 'Arial',
          fontSize,
          bold: parseAssBoolean(style.bold),
          italic: parseAssBoolean(style.italic),
          underline: parseAssBoolean(style.underline),
          strikeOut: parseAssBoolean(style.strikeout),
          primaryColor: parseAssHexColor(style.primarycolour, 'rgba(255, 255, 255, 1)'),
          outlineColor: parseAssHexColor(style.outlinecolour, 'rgba(0, 0, 0, 1)'),
          shadowColor: parseAssHexColor(style.backcolour, 'rgba(0, 0, 0, 0.88)'),
          outline: Math.max(0, parseAssNumber(style.outline, 2)),
          shadow: Math.max(0, parseAssNumber(style.shadow, 1.6)),
          alignment,
          marginL: Math.max(0, parseAssNumber(style.marginl, 10)),
          marginR: Math.max(0, parseAssNumber(style.marginr, 10)),
          marginV: Math.max(0, parseAssNumber(style.marginv, 30)),
          playResX: Math.max(1, parseAssNumber(scriptInfo.playresx, 1920)),
          playResY: Math.max(1, parseAssNumber(scriptInfo.playresy, 1080))
        };
      };

      const buildAssCueTextShadow = (
        outline = 0,
        shadow = 0,
        outlineColor = 'rgba(0, 0, 0, 1)',
        shadowColor = 'rgba(0, 0, 0, 0.88)'
      ) => {
        const fmt = (value) => Number(value || 0).toFixed(2).replace(/\.?0+$/, '') || '0';
        const layers = [];
        const outlinePx = Math.max(0, Number(outline) || 0);
        const shadowPx = Math.max(0, Number(shadow) || 0);

        if (outlinePx > 0) {
          const offsets = [
            [0, 0],
            [outlinePx, 0],
            [-outlinePx, 0],
            [0, outlinePx],
            [0, -outlinePx],
            [outlinePx, outlinePx],
            [outlinePx, -outlinePx],
            [-outlinePx, outlinePx],
            [-outlinePx, -outlinePx]
          ];
          offsets.forEach(([x, y]) => {
            layers.push(`${fmt(x)}px ${fmt(y)}px 0 ${outlineColor}`);
          });
        }

        if (shadowPx > 0) {
          const blur = Math.max(1, shadowPx * 1.5);
          layers.push(`0 ${fmt(shadowPx)}px ${fmt(blur)}px ${shadowColor}`);
        }

        if (!layers.length) {
          return '0 2px 10px rgba(0, 0, 0, 0.85)';
        }
        return layers.join(', ');
      };

      const getAssFallbackRenderHeight = () => {
        const rendererCanvas = state.assRenderer?.canvas || null;
        const canvasStyleHeight = Number.parseFloat(String(rendererCanvas?.style?.height || '').replace('px', ''));
        if (Number.isFinite(canvasStyleHeight) && canvasStyleHeight > 0) {
          return canvasStyleHeight;
        }
        const videoRect = typeof video?.getBoundingClientRect === 'function'
          ? video.getBoundingClientRect()
          : null;
        if (videoRect && Number.isFinite(videoRect.height) && videoRect.height > 0) {
          return videoRect.height;
        }
        const shellRect = typeof playerShell?.getBoundingClientRect === 'function'
          ? playerShell.getBoundingClientRect()
          : null;
        if (shellRect && Number.isFinite(shellRect.height) && shellRect.height > 0) {
          return shellRect.height;
        }
        return 0;
      };

      const getAssFallbackRenderScale = (profile = null) => {
        const style = profile && typeof profile === 'object' ? profile : assFallbackCueStyleProfile;
        const playResY = Math.max(1, parseAssNumber(style?.playResY, 1080));
        const renderHeight = getAssFallbackRenderHeight();
        if (!(renderHeight > 0)) return 1;
        return clamp(renderHeight / playResY, 0.35, 8);
      };

      const buildAssFallbackCueCss = (profile = null) => {
        if (!profile || typeof profile !== 'object') return '';
        const scale = getAssFallbackRenderScale(profile);
        const fontSize = Math.max(10, parseAssNumber(profile.fontSize, 40) * scale);
        const decorations = [];
        if (profile.underline) decorations.push('underline');
        if (profile.strikeOut) decorations.push('line-through');
        const textDecoration = decorations.length ? decorations.join(' ') : 'none';
        const textShadow = buildAssCueTextShadow(
          Math.max(0, parseAssNumber(profile.outline, 2) * scale),
          Math.max(0, parseAssNumber(profile.shadow, 1.6) * scale),
          profile.outlineColor,
          profile.shadowColor
        );

        return `
.media-player[data-ass-fallback-style="1"] video::cue {
  background: transparent !important;
  color: ${profile.primaryColor || 'rgba(255, 255, 255, 1)'} !important;
  font-family: ${formatCssFontFamily(profile.fontName)} !important;
  font-size: ${fontSize.toFixed(2).replace(/\.?0+$/, '')}px !important;
  font-weight: ${profile.bold ? '700' : '400'} !important;
  font-style: ${profile.italic ? 'italic' : 'normal'} !important;
  text-decoration: ${textDecoration} !important;
  text-shadow: ${textShadow} !important;
}
`;
      };

      const setAssFallbackCueStyleActive = (active) => {
        if (!playerShell) return;
        if (active) {
          playerShell.setAttribute('data-ass-fallback-style', '1');
        } else {
          playerShell.removeAttribute('data-ass-fallback-style');
        }
      };

      const setNativeVttCueStyleActive = (active) => {
        if (!playerShell) return;
        if (active) {
          playerShell.setAttribute('data-native-vtt-style', '1');
        } else {
          playerShell.removeAttribute('data-native-vtt-style');
        }
      };

      const findManifestSubtitleTrackByIndex = (index = null) => {
        const numericIndex = Number(index);
        if (!Number.isInteger(numericIndex) || numericIndex < 0) return null;
        if (!Array.isArray(state.hlsManifestSubtitleTracks)) return null;
        return state.hlsManifestSubtitleTracks.find((track) =>
          Number.isInteger(Number(track?.index)) && Number(track.index) === numericIndex
        ) || null;
      };

      const resolveCanonicalSubtitleTrackTextFormat = (track = null) => {
        if (!track || typeof track !== 'object') return '';
        const explicitFormat = String(track.textFormat || '').trim().toLowerCase();
        if (explicitFormat === 'vtt' || explicitFormat === 'srt') {
          return explicitFormat;
        }

        const explicitTextUrl = toAbsoluteAssetUrl(track.textUrl || '');
        if (isVttSubtitleUrl(explicitTextUrl)) return 'vtt';
        if (isSrtSubtitleUrl(explicitTextUrl)) return 'srt';

        const subtitleIndexCandidates = new Set();
        const pushIndexCandidate = (value) => {
          const parsed = parseCodexSubtitleIndexFromValue(value);
          if (Number.isInteger(parsed) && parsed >= 0) {
            subtitleIndexCandidates.add(parsed);
          }
        };

        pushIndexCandidate(track.catalogKey || '');
        pushIndexCandidate(track.id || '');
        pushIndexCandidate(track.textUrl || '');
        pushIndexCandidate(track.assUrl || '');

        for (const subtitleIndex of subtitleIndexCandidates) {
          const manifestTrack = findManifestSubtitleTrackByIndex(subtitleIndex);
          const manifestTextUrl = toAbsoluteAssetUrl(manifestTrack?.textUrl || '');
          if (isVttSubtitleUrl(manifestTextUrl)) return 'vtt';
          if (isSrtSubtitleUrl(manifestTextUrl)) return 'srt';
        }

        return '';
      };

      const shouldUseNativeVttCueStyleForTrack = (track = null) => {
        const runtimeMode = String(state.subtitleRuntimeMode || '').trim().toLowerCase();
        if (!track || !['dynamic', 'native', 'hls'].includes(runtimeMode)) {
          return false;
        }
        return resolveCanonicalSubtitleTrackTextFormat(track) === 'vtt';
      };

      const applyAssFallbackCueStyle = (profile = null) => {
        assFallbackCueStyleProfile = profile && typeof profile === 'object'
          ? { ...profile }
          : null;
        const styleEl = ensureAssFallbackCueStyleEl();
        styleEl.textContent = buildAssFallbackCueCss(assFallbackCueStyleProfile);
        setAssFallbackCueStyleActive(!!assFallbackCueStyleProfile);
      };

      const refreshAssFallbackCueStyle = () => {
        if (!assFallbackCueStyleProfile) return;
        const styleEl = ensureAssFallbackCueStyleEl();
        styleEl.textContent = buildAssFallbackCueCss(assFallbackCueStyleProfile);
      };

      const resetAssFallbackCueStyle = () => {
        assFallbackCueStyleProfile = null;
        if (assFallbackCueStyleEl) {
          assFallbackCueStyleEl.textContent = '';
        }
        setAssFallbackCueStyleActive(false);
      };

      const primeAssCueStyleProfile = async (subtitleUrl = '', inlineContent = '') => {
        const safeUrl = normalizeAssSubtitleFetchUrl(subtitleUrl || '') || toAbsoluteAssetUrl(subtitleUrl || '');
        if (!safeUrl || !isAssSubtitleUrl(safeUrl)) return false;

        const tryApplyFromSource = (sourceText = '') => {
          const profile = parseAssStyleProfile(sourceText);
          if (!profile) return false;
          applyAssFallbackCueStyle(profile);
          return true;
        };

        const inline = String(inlineContent || '');
        if (inline.trim() && tryApplyFromSource(inline)) {
          return true;
        }

        try {
          const response = await fetch(safeUrl, { credentials: 'same-origin', cache: 'force-cache' });
          if (!response.ok) return false;
          const fetchedBuffer = await response.arrayBuffer();
          const decoded = pickBestDecodedSubtitleCandidate(fetchedBuffer, { preferAss: true });
          const content = String(decoded?.text || '');
          return tryApplyFromSource(content);
        } catch {
          return false;
        }
      };

      const primeAssCueStyleFromWatchData = async (watchData = null) => {
        const inlineManagedContent = String(watchData?.episode?.subtitle_meta?.content || '');
        if (inlineManagedContent.trim()) {
          const profile = parseAssStyleProfile(inlineManagedContent);
          if (profile) {
            applyAssFallbackCueStyle(profile);
            return true;
          }
        }

        const managedAssUrl = pickAssSubtitleUrl(watchData);
        if (managedAssUrl) {
          return primeAssCueStyleProfile(managedAssUrl, '');
        }
        return false;
      };

      const ensureManagedAssStyleProfileReady = async () => {
        if (assFallbackCueStyleProfile) return true;
        const managedAssUrl = normalizeAssSubtitleFetchUrl(state.assSubtitleUrl || '') || toAbsoluteAssetUrl(state.assSubtitleUrl || '');
        if (!managedAssUrl || !isAssSubtitleUrl(managedAssUrl)) return false;
        const inlineStyleSource = typeof state.assSubtitleMeta?.content === 'string'
          ? state.assSubtitleMeta.content
          : '';
        return primeAssCueStyleProfile(managedAssUrl, inlineStyleSource);
      };

      const parseAssOverrideTags = (value = '') => {
        const text = String(value || '');
        if (!text.includes('{') || !text.includes('}')) return null;

        const blocks = text.match(/\{[^}]*\}/g);
        if (!Array.isArray(blocks) || !blocks.length) return null;

        let alignment = null;
        let posX = null;
        let posY = null;
        let moveX = null;
        let moveY = null;

        for (const blockRaw of blocks) {
          const block = String(blockRaw || '');
          if (!block) continue;

          let match;
          const alignRegex = /\\an\s*([1-9])/ig;
          while ((match = alignRegex.exec(block)) !== null) {
            const parsed = Number.parseInt(String(match[1] || ''), 10);
            if (Number.isFinite(parsed) && parsed >= 1 && parsed <= 9) {
              alignment = parsed;
            }
          }

          const posMatch = block.match(
            /\\pos\s*\(\s*([-+]?\d+(?:[.,]\d+)?)\s*,\s*([-+]?\d+(?:[.,]\d+)?)\s*\)/i
          );
          if (posMatch) {
            const parsedX = parseAssNumber(posMatch[1], Number.NaN);
            const parsedY = parseAssNumber(posMatch[2], Number.NaN);
            if (Number.isFinite(parsedX) && Number.isFinite(parsedY)) {
              posX = parsedX;
              posY = parsedY;
            }
          }

          const moveMatch = block.match(
            /\\move\s*\(\s*([-+]?\d+(?:[.,]\d+)?)\s*,\s*([-+]?\d+(?:[.,]\d+)?)\s*,\s*([-+]?\d+(?:[.,]\d+)?)\s*,\s*([-+]?\d+(?:[.,]\d+)?)(?:\s*,\s*[-+]?\d+(?:[.,]\d+)?\s*,\s*[-+]?\d+(?:[.,]\d+)?)?\s*\)/i
          );
          if (moveMatch) {
            const parsedX1 = parseAssNumber(moveMatch[1], Number.NaN);
            const parsedY1 = parseAssNumber(moveMatch[2], Number.NaN);
            if (Number.isFinite(parsedX1) && Number.isFinite(parsedY1)) {
              moveX = parsedX1;
              moveY = parsedY1;
            }
          }
        }

        const hasAlignment = Number.isFinite(alignment);
        const hasPos = Number.isFinite(posX) && Number.isFinite(posY);
        const hasMove = Number.isFinite(moveX) && Number.isFinite(moveY);
        if (!hasAlignment && !hasPos && !hasMove) return null;

        return {
          alignment: hasAlignment ? alignment : null,
          posX: hasPos ? posX : null,
          posY: hasPos ? posY : null,
          moveX: hasMove ? moveX : null,
          moveY: hasMove ? moveY : null
        };
      };

      const getAssFallbackCueSettings = (profile = null, overrides = null) => {
        const style = profile && typeof profile === 'object' ? profile : assFallbackCueStyleProfile;
        if (!style) return '';
        const override = overrides && typeof overrides === 'object' ? overrides : null;

        const alignment = Math.min(
          9,
          Math.max(
            1,
            Math.round(
              parseAssNumber(
                Number.isFinite(override?.alignment) ? override.alignment : style.alignment,
                2
              )
            )
          )
        );
        const playResX = Math.max(1, parseAssNumber(style.playResX, 1920));
        const playResY = Math.max(1, parseAssNumber(style.playResY, 1080));
        const marginL = Math.max(0, parseAssNumber(style.marginL, 10));
        const marginR = Math.max(0, parseAssNumber(style.marginR, 10));
        const marginV = Math.max(0, parseAssNumber(style.marginV, 30));
        const fontSize = Math.max(10, parseAssNumber(style.fontSize, 40));

        const isLeftAligned = [1, 4, 7].includes(alignment);
        const isCenterAligned = [2, 5, 8].includes(alignment);
        const isRightAligned = [3, 6, 9].includes(alignment);
        const isBottomAligned = [1, 2, 3].includes(alignment);
        const isMiddleAligned = [4, 5, 6].includes(alignment);
        const isTopAligned = [7, 8, 9].includes(alignment);

        const textAlignToken = isLeftAligned ? 'start' : (isRightAligned ? 'end' : 'middle');
        const lineAlignToken = isTopAligned ? 'start' : (isBottomAligned ? 'end' : 'center');
        const positionAlignToken = isLeftAligned ? 'line-left' : (isRightAligned ? 'line-right' : 'center');

        let positionPercent = 50;
        if (isLeftAligned) {
          positionPercent = (marginL / playResX) * 100;
        } else if (isRightAligned) {
          positionPercent = 100 - ((marginR / playResX) * 100);
        }
        positionPercent = clamp(positionPercent, 0, 100);

        const hasPosOverride = Number.isFinite(override?.posX) && Number.isFinite(override?.posY);
        const hasMoveOverride = Number.isFinite(override?.moveX) && Number.isFinite(override?.moveY);

        if (hasPosOverride || hasMoveOverride) {
          const pointX = Number.isFinite(override?.posX) ? override.posX : override.moveX;
          const pointY = Number.isFinite(override?.posY) ? override.posY : override.moveY;
          positionPercent = clamp((pointX / playResX) * 100, 0, 100);
          const linePercentFromPoint = clamp((pointY / playResY) * 100, 0, 100);
          const lineText = linePercentFromPoint.toFixed(2).replace(/\.?0+$/, '');
          const positionText = positionPercent.toFixed(2).replace(/\.?0+$/, '');
          return `line:${lineText}%,${lineAlignToken} position:${positionText}%,${positionAlignToken} align:${textAlignToken}`;
        }

        let linePercent = 50;
        if (isBottomAligned) {
          linePercent = 100 - (((marginV + (fontSize * 1.2)) / playResY) * 100);
          linePercent = Math.max(0, Math.min(100, linePercent));
        } else if (isTopAligned) {
          linePercent = ((marginV + (fontSize * 0.8)) / playResY) * 100;
          linePercent = Math.max(0, Math.min(100, linePercent));
        } else if (isMiddleAligned || isCenterAligned) {
          linePercent = 50;
        }

        const lineText = linePercent.toFixed(2).replace(/\.?0+$/, '');
        const positionText = positionPercent.toFixed(2).replace(/\.?0+$/, '');
        return `line:${lineText}%,${lineAlignToken} position:${positionText}%,${positionAlignToken} align:${textAlignToken}`;
      };

      const clearAssFallbackTrack = () => {
        if (state.assFallbackTrackEl && state.assFallbackTrackEl.parentNode) {
          state.assFallbackTrackEl.parentNode.removeChild(state.assFallbackTrackEl);
        }
        state.assFallbackTrackEl = null;
        if (state.assFallbackTrackObjectUrl) {
          try {
            URL.revokeObjectURL(state.assFallbackTrackObjectUrl);
          } catch (_) {}
        }
        state.assFallbackTrackObjectUrl = null;
        state.assFallbackOptionId = null;
        if (playerShell) {
          delete playerShell.dataset.assCueCount;
          delete playerShell.dataset.assConversion;
        }
        resetAssFallbackCueStyle();
      };

      const assTimeToVtt = (value = '') => {
        const raw = String(value || '').trim().replace(/\s+/g, '');
        const match = raw.match(/^(\d+):(\d{1,2}):(\d{1,2})(?:[.,](\d{1,3}))?$/);
        if (!match) return null;
        const hour = String(Number(match[1] || 0)).padStart(2, '0');
        const minute = String(Number(match[2] || 0)).padStart(2, '0');
        const second = String(Number(match[3] || 0)).padStart(2, '0');
        const centiOrMs = String(match[4] || '0');
        const millis = centiOrMs.length <= 2
          ? centiOrMs.padEnd(2, '0').slice(0, 2) + '0'
          : centiOrMs.padEnd(3, '0').slice(0, 3);
        return `${hour}:${minute}:${second}.${millis}`;
      };

      const assTextToPlain = (value = '') => String(value || '')
        .replace(/\{[^}]*\}/g, '')
        .replace(/\\N/gi, '\n')
        .replace(/\\n/gi, '\n')
        .replace(/\\h/gi, ' ')
        .replace(/\r/g, '')
        .trim();

      const convertAssToVttWithStats = (source = '', cueSettings = '', styleProfile = null) => {
        const text = String(source || '');
        if (!text.trim()) return { vtt: '', cueCount: 0, mode: 'empty' };
        const timingSettings = String(cueSettings || '').trim();
        const lines = text.split(/\r?\n/);
        const cues = [];
        const normalizedProfile = styleProfile && typeof styleProfile === 'object'
          ? styleProfile
          : assFallbackCueStyleProfile;
        let section = '';
        let eventsFormatFields = [];
        let startFieldIndex = 1;
        let endFieldIndex = 2;
        let textFieldIndex = 9;

        const buildTiming = (start, end, settings = '') => {
          const normalizedSettings = String(settings || timingSettings || '').trim();
          return normalizedSettings
            ? `${start} --> ${end} ${normalizedSettings}`
            : `${start} --> ${end}`;
        };

        const splitAssValues = (body = '', expectedCount = 0) => {
          if (!expectedCount || expectedCount < 2) {
            return String(body || '').split(',');
          }
          const parts = [];
          let current = '';
          let commaCount = 0;
          for (const ch of String(body || '')) {
            if (ch === ',' && commaCount < expectedCount - 1) {
              parts.push(current);
              current = '';
              commaCount += 1;
            } else {
              current += ch;
            }
          }
          parts.push(current);
          return parts;
        };

        const normalizeEventFieldName = (value = '') => {
          return String(value || '')
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '');
        };

        const refreshEventIndexes = () => {
          if (!Array.isArray(eventsFormatFields) || !eventsFormatFields.length) {
            startFieldIndex = 1;
            endFieldIndex = 2;
            textFieldIndex = 9;
            return;
          }
          const idxStart = eventsFormatFields.findIndex((field) => field === 'start');
          const idxEnd = eventsFormatFields.findIndex((field) => field === 'end');
          const idxText = eventsFormatFields.findIndex((field) => field === 'text');
          startFieldIndex = idxStart >= 0 ? idxStart : 1;
          endFieldIndex = idxEnd >= 0 ? idxEnd : 2;
          textFieldIndex = idxText >= 0 ? idxText : Math.max(eventsFormatFields.length - 1, 0);
        };

        refreshEventIndexes();

        for (const lineRaw of lines) {
          const line = String(lineRaw || '').trim();
          if (!line || line.startsWith(';')) continue;
          const sectionMatch = line.match(/^\[([^\]]+)\]$/);
          if (sectionMatch) {
            section = String(sectionMatch[1] || '').trim().toLowerCase();
            continue;
          }
          if (section === 'events' && /^format\s*:/i.test(line)) {
            eventsFormatFields = line
              .replace(/^format\s*:/i, '')
              .split(',')
              .map((part) => normalizeEventFieldName(part));
            refreshEventIndexes();
            continue;
          }
          if (!/^Dialogue\s*:/i.test(line)) continue;
          const body = line.replace(/^Dialogue\s*:/i, '').trim();
          const expectedCount = eventsFormatFields.length > 0 ? eventsFormatFields.length : 10;
          const parts = splitAssValues(body, expectedCount);
          if (parts.length < 3) continue;

          const safeStartIndex = startFieldIndex >= 0 && startFieldIndex < parts.length ? startFieldIndex : 1;
          const safeEndIndex = endFieldIndex >= 0 && endFieldIndex < parts.length ? endFieldIndex : 2;
          const safeTextIndex = textFieldIndex >= 0 && textFieldIndex < parts.length
            ? textFieldIndex
            : Math.max(parts.length - 1, 0);
          const start = assTimeToVtt(parts[safeStartIndex] || '');
          const end = assTimeToVtt(parts[safeEndIndex] || '');
          const cueSource = parts.slice(safeTextIndex).join(',');
          const cueText = assTextToPlain(cueSource);
          if (!start || !end || !cueText) continue;
          const overrideTags = parseAssOverrideTags(cueSource);
          const cueTimingSettings = overrideTags
            ? (getAssFallbackCueSettings(normalizedProfile, overrideTags) || timingSettings)
            : timingSettings;
          cues.push(`${buildTiming(start, end, cueTimingSettings)}\n${cueText}`);
        }

        if (cues.length) {
          return {
            vtt: `WEBVTT\n\n${cues.join('\n\n')}\n`,
            cueCount: cues.length,
            mode: 'strict'
          };
        }

        // Fallback tolerante para ASS com linhas parcialmente inválidas.
        const looseCues = [];
        const timePattern = /(\d+\s*:\s*\d{1,2}\s*:\s*\d{1,2}(?:[.,]\d{1,3})?)/g;
        for (const lineRaw of lines) {
          const line = String(lineRaw || '').trim();
          if (!/^Dialogue\s*:/i.test(line)) continue;
          const body = line.replace(/^Dialogue\s*:/i, '').trim();
          const timeMatches = Array.from(body.matchAll(timePattern)).map((match) => String(match?.[1] || '').trim());
          if (timeMatches.length < 2) continue;

          const start = assTimeToVtt(timeMatches[0]);
          const end = assTimeToVtt(timeMatches[1]);
          if (!start || !end) continue;

          let textRaw = '';
          const commaIndexes = [];
          for (let i = 0; i < body.length; i += 1) {
            if (body[i] === ',') commaIndexes.push(i);
          }
          const safeLooseTextIndex = Math.max(0, Number(textFieldIndex) || 0);
          if (safeLooseTextIndex === 0) {
            textRaw = body;
          } else if (commaIndexes.length >= safeLooseTextIndex) {
            const splitAt = commaIndexes[safeLooseTextIndex - 1];
            textRaw = body.slice(splitAt + 1);
          } else if (commaIndexes.length > 0) {
            textRaw = body.slice(commaIndexes[commaIndexes.length - 1] + 1);
          } else {
            textRaw = body;
          }

          let cueText = assTextToPlain(textRaw);
          if (!cueText) {
            cueText = assTextToPlain(
              body
                .replace(timePattern, '')
                .replace(/^[^,]*,?/, '')
            );
          }
          if (!cueText) continue;
          const overrideTags = parseAssOverrideTags(textRaw);
          const cueTimingSettings = overrideTags
            ? (getAssFallbackCueSettings(normalizedProfile, overrideTags) || timingSettings)
            : timingSettings;
          looseCues.push(`${buildTiming(start, end, cueTimingSettings)}\n${cueText}`);
        }

        if (!looseCues.length) return { vtt: '', cueCount: 0, mode: 'empty' };
        return {
          vtt: `WEBVTT\n\n${looseCues.join('\n\n')}\n`,
          cueCount: looseCues.length,
          mode: 'loose'
        };
      };

      const convertAssToVtt = (source = '', cueSettings = '', styleProfile = null) => {
        const result = convertAssToVttWithStats(source, cueSettings, styleProfile);
        return String(result?.vtt || '');
      };

      const convertSrtToVtt = (value = '') => {
        const raw = String(value || '');
        if (!raw.trim()) return '';
        const noBom = raw.replace(/^\uFEFF/, '');
        const normalized = noBom.replace(/\r+/g, '');
        const timeFixed = normalized.replace(
          /(\d{2}:\d{2}:\d{2}),(\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}),(\d{3})/g,
          '$1.$2 --> $3.$4'
        );
        const cleaned = timeFixed
          .replace(/^\d+\s*$/gm, '')
          .replace(/\n{3,}/g, '\n\n')
          .trim();
        if (!cleaned) return '';
        return `WEBVTT\n\n${cleaned}\n`;
      };

      const decodeSubtitleCandidatesFromBuffer = (arrayBuffer) => {
        if (!(arrayBuffer instanceof ArrayBuffer) || arrayBuffer.byteLength <= 0) return [];
        const bytes = new Uint8Array(arrayBuffer);
        const withDecoder = (label, encoding, chunk = bytes) => {
          try {
            const text = new TextDecoder(encoding, { fatal: false }).decode(chunk);
            return { label, text: String(text || '') };
          } catch {
            return null;
          }
        };

        const candidates = [];
        const hasUtf8Bom =
          bytes.length >= 3 &&
          bytes[0] === 0xEF &&
          bytes[1] === 0xBB &&
          bytes[2] === 0xBF;
        const hasUtf16LeBom =
          bytes.length >= 2 &&
          bytes[0] === 0xFF &&
          bytes[1] === 0xFE;
        const hasUtf16BeBom =
          bytes.length >= 2 &&
          bytes[0] === 0xFE &&
          bytes[1] === 0xFF;

        if (hasUtf16LeBom) {
          const slice = bytes.slice(2);
          const decoded = withDecoder('fetch:utf16le-bom', 'utf-16le', slice);
          if (decoded) candidates.push(decoded);
        } else if (hasUtf16BeBom) {
          const slice = bytes.slice(2);
          const decoded = withDecoder('fetch:utf16be-bom', 'utf-16be', slice);
          if (decoded) candidates.push(decoded);
        } else if (hasUtf8Bom) {
          const slice = bytes.slice(3);
          const decoded = withDecoder('fetch:utf8-bom', 'utf-8', slice);
          if (decoded) candidates.push(decoded);
        }

        const fallbackDecoders = [
          ['fetch:utf8', 'utf-8'],
          ['fetch:utf16le', 'utf-16le'],
          ['fetch:utf16be', 'utf-16be'],
          ['fetch:latin1', 'windows-1252']
        ];
        fallbackDecoders.forEach(([label, encoding]) => {
          const decoded = withDecoder(label, encoding);
          if (decoded) candidates.push(decoded);
        });

        const unique = [];
        const seen = new Set();
        for (const candidate of candidates) {
          const text = String(candidate?.text || '');
          if (!text) continue;
          const key = `${candidate.label}|${text.slice(0, 180)}`;
          if (seen.has(key)) continue;
          seen.add(key);
          unique.push(candidate);
        }
        return unique;
      };

      const scoreDecodedSubtitleCandidate = (value = '', { preferAss = false } = {}) => {
        const text = normalizeSubtitleSourceText(value);
        if (!text.trim()) return Number.NEGATIVE_INFINITY;
        const assMarkerCount =
          (text.match(/Dialogue\s*:/gi) || []).length +
          ((/\[Events\]/i.test(text) ? 1 : 0) * 2) +
          ((/\[Script Info\]/i.test(text) ? 1 : 0) * 2);
        const vttMarkerCount = /^WEBVTT\b/im.test(text) ? 4 : 0;
        const cueCount = Math.min((text.match(/-->/g) || []).length, 20);
        const replacementCount = (text.match(/\uFFFD/g) || []).length;
        const nullCount = (text.match(/\u0000/g) || []).length;
        const mojibakeCount = (text.match(/Ã.|Â.|â€|â€™|â€œ|â€\u009d|â€¦|ðŸ|Å.|Ð.|Ñ.|¤|�/g) || []).length;
        const markerScore = (assMarkerCount * (preferAss ? 18 : 10)) + (vttMarkerCount * 12) + (cueCount * 2);
        const noisePenalty = (replacementCount * 14) + (nullCount * 18) + (mojibakeCount * 9);
        return markerScore - noisePenalty;
      };

      const pickBestDecodedSubtitleCandidate = (arrayBuffer, { preferAss = false } = {}) => {
        const candidates = decodeSubtitleCandidatesFromBuffer(arrayBuffer)
          .map((candidate) => ({
            ...candidate,
            text: normalizeSubtitleSourceText(candidate?.text || ''),
            score: scoreDecodedSubtitleCandidate(candidate?.text || '', { preferAss })
          }))
          .filter((candidate) => candidate.text.trim())
          .sort((left, right) => right.score - left.score);
        return candidates[0] || null;
      };

      const normalizeSubtitleSourceText = (value = '') => {
        let raw = String(value || '');
        if (!raw) return '';
        raw = raw.replace(/^\uFEFF/, '');
        // Corrige conteúdo UTF-16 lido como UTF-8 (A\0S\0S\0...).
        raw = raw.replace(/\u0000+/g, '');
        // Alguns fluxos persistem conteúdo escapado (\\n) em vez de newline real.
        if (!/[\r\n]/.test(raw) && /\\n|\\r/.test(raw)) {
          raw = raw
            .replace(/\\r\\n/g, '\n')
            .replace(/\\n/g, '\n')
            .replace(/\\r/g, '\r');
        }
        return raw;
      };

      const countVttCueBlocks = (vttText = '') => {
        const text = String(vttText || '');
        if (!text.trim()) return 0;
        const matches = text.match(/-->/g);
        return Array.isArray(matches) ? matches.length : 0;
      };

      const convertSubtitleTextToVtt = (source = '', cueSettings = '', styleProfile = null) => {
        const normalized = normalizeSubtitleSourceText(source);
        const trimmed = String(normalized || '').trim();
        if (!trimmed) return { vtt: '', cueCount: 0, mode: 'empty' };

        if (/^WEBVTT\b/i.test(trimmed)) {
          const vtt = trimmed.endsWith('\n') ? trimmed : `${trimmed}\n`;
          return {
            vtt,
            cueCount: countVttCueBlocks(vtt),
            mode: 'vtt'
          };
        }

        const assResult = convertAssToVttWithStats(normalized, cueSettings, styleProfile);
        if (assResult?.vtt) {
          return {
            vtt: String(assResult.vtt || ''),
            cueCount: Number(assResult.cueCount || 0),
            mode: `ass-${String(assResult.mode || 'strict')}`
          };
        }

        if (/-->/.test(trimmed)) {
          const fromSrt = convertSrtToVtt(normalized);
          if (fromSrt) {
            return {
              vtt: fromSrt,
              cueCount: countVttCueBlocks(fromSrt),
              mode: 'srt'
            };
          }
        }

        return { vtt: '', cueCount: 0, mode: 'empty' };
      };

      const buildNativeSubtitleTrack = async (subtitleUrl, subtitleMeta = null, inlineContent = '') => {
        const safeUrl = toAbsoluteAssetUrl(subtitleUrl || '');
        if (!safeUrl) return false;
        try {
          clearAssFallbackTrack();

          let trackSrc = safeUrl;
          let needsBlob = false;
          let textContent = String(inlineContent || '');

          if (isSrtSubtitleUrl(safeUrl) || isVttSubtitleUrl(safeUrl)) {
            if (!textContent.trim()) {
              textContent = await fetchTextSubtitleContentByUrl(safeUrl).catch(() => '');
            }
            const vttContent = isSrtSubtitleUrl(safeUrl)
              ? convertSrtToVtt(textContent)
              : (
                /^WEBVTT/i.test(textContent.trim())
                  ? (textContent.endsWith('\n') ? textContent : `${textContent}\n`)
                  : (textContent.trim() ? `WEBVTT\n\n${textContent.trim()}\n` : '')
              );
            if (!vttContent) return false;
            trackSrc = URL.createObjectURL(new Blob([vttContent], { type: 'text/vtt' }));
            needsBlob = true;
          } else {
            return false;
          }

          const trackEl = document.createElement('track');
          trackEl.kind = 'subtitles';
          trackEl.label = String(subtitleMeta?.label || 'Legenda').trim() || 'Legenda';
          trackEl.srclang = String(subtitleMeta?.idioma || 'pt-BR').trim() || 'pt-BR';
          trackEl.src = trackSrc;
          trackEl.default = true;
          video.appendChild(trackEl);

          state.assFallbackTrackEl = trackEl;
          state.assFallbackTrackObjectUrl = needsBlob ? trackSrc : null;

          const textTrack = trackEl.track;
          if (textTrack) {
            textTrack.mode = 'disabled';
          }
          return true;
        } catch {
          return false;
        }
      };

      const buildAssFallbackTrack = async (subtitleUrl, subtitleMeta = null, inlineContent = '', expectedEpoch = null) => {
        const safeUrl = normalizeAssSubtitleFetchUrl(subtitleUrl || '') || toAbsoluteAssetUrl(subtitleUrl || '');
        if (!safeUrl) {
          state.assLastError = 'invalid_ass_url';
          if (playerShell) playerShell.dataset.assLastError = state.assLastError;
          return false;
        }
        const subtitleCandidateUrls = [];
        const seenSubtitleCandidateUrls = new Set();
        const appendSubtitleCandidateUrl = (value = '') => {
          const candidateUrl = normalizeAssSubtitleFetchUrl(value || '') || toAbsoluteAssetUrl(value || '');
          if (!candidateUrl) return;
          if (!isAssSubtitleUrl(candidateUrl)) return;
          if (seenSubtitleCandidateUrls.has(candidateUrl)) return;
          seenSubtitleCandidateUrls.add(candidateUrl);
          subtitleCandidateUrls.push(candidateUrl);
        };
        appendSubtitleCandidateUrl(safeUrl);
        if (Array.isArray(subtitleMeta?.candidateUrls)) {
          subtitleMeta.candidateUrls.forEach((candidateUrl) => {
            appendSubtitleCandidateUrl(candidateUrl);
          });
        }
        const isStale = () => Number.isFinite(Number(expectedEpoch)) && !isSubtitleSelectionEpochCurrent(Number(expectedEpoch));
        try {
          state.assLastError = null;
          if (playerShell) delete playerShell.dataset.assLastError;

          const attemptErrors = [];
          let selected = null;
          let inlineNonAssCandidate = null;
          const defaultProfile = buildDefaultAssStyleProfile();

          const parseCandidateFromSource = (rawSource = '', sourceName = 'unknown', preferredProfile = null) => {
            const sourceText = normalizeSubtitleSourceText(rawSource);
            if (!sourceText.trim()) {
              attemptErrors.push(`${sourceName}:empty`);
              return null;
            }

            const parsedProfile = preferredProfile || parseAssStyleProfile(sourceText);
            const styleProfile = parsedProfile && typeof parsedProfile === 'object'
              ? parsedProfile
              : defaultProfile;
            const cueSettings = getAssFallbackCueSettings(styleProfile);
            const converted = convertSubtitleTextToVtt(sourceText, cueSettings, styleProfile);
            const vttContent = String(converted?.vtt || '');
            const cueCount = Number(converted?.cueCount || 0);
            const conversionMode = String(converted?.mode || 'empty');
            if (!vttContent) {
              attemptErrors.push(`${sourceName}:${conversionMode}`);
              return null;
            }

            return {
              sourceName,
              sourceText,
              vttContent,
              cueCount,
              conversionMode,
              styleProfile,
              cueSettings,
              isAss: /^ass-/i.test(conversionMode)
            };
          };

          const inlineText = normalizeSubtitleSourceText(inlineContent);
          if (inlineText.trim()) {
            const inlineCandidate = parseCandidateFromSource(inlineText, 'inline');
            if (inlineCandidate) {
              if (inlineCandidate.isAss) {
                selected = inlineCandidate;
              } else {
                inlineNonAssCandidate = inlineCandidate;
              }
            }
          } else {
            attemptErrors.push('inline:empty');
          }

          // Inline pode vir desatualizado; sempre tentamos fetch quando existe inline.
          const shouldForceFetch = inlineText.trim().length > 0;
          if (!selected || shouldForceFetch) {
            const allowCacheRead = !shouldForceFetch && !selected;
            for (const candidateUrl of subtitleCandidateUrls) {
              if (selected) break;
              if (allowCacheRead && state.assFallbackVttCache instanceof Map) {
                const cachedEntry = state.assFallbackVttCache.get(candidateUrl);
                if (cachedEntry && typeof cachedEntry === 'object') {
                  const cachedVtt = String(cachedEntry.vtt || '');
                  if (cachedVtt.trim()) {
                    selected = {
                      sourceName: 'cache',
                      subtitleUrl: candidateUrl,
                      vttContent: cachedVtt,
                      cueCount: Number(cachedEntry.cueCount || 0),
                      conversionMode: String(cachedEntry.conversionMode || 'cache'),
                      styleProfile: cachedEntry.styleProfile && typeof cachedEntry.styleProfile === 'object'
                        ? cachedEntry.styleProfile
                        : defaultProfile,
                      cueSettings: String(cachedEntry.cueSettings || '').trim() || getAssFallbackCueSettings(defaultProfile),
                      isAss: /^ass-/i.test(String(cachedEntry.conversionMode || '')),
                      sourceText: String(cachedEntry.sourceText || '')
                    };
                  } else {
                    attemptErrors.push(`cache:empty:${candidateUrl}`);
                  }
                }
              }

              const shouldTryFetch = shouldForceFetch || !selected;
              if (shouldTryFetch) {
                const fetchCacheMode = shouldForceFetch ? 'no-store' : 'force-cache';
                const response = await fetch(candidateUrl, { credentials: 'same-origin', cache: fetchCacheMode });
                if (!response.ok) {
                  attemptErrors.push(`fetch:http_${response.status}:${candidateUrl}`);
                } else {
                  const fetchedBuffer = await response.arrayBuffer();
                  const decodedCandidates = decodeSubtitleCandidatesFromBuffer(fetchedBuffer);
                  for (const decoded of decodedCandidates) {
                    const fetchedCandidate = parseCandidateFromSource(decoded.text, decoded.label || 'fetch');
                    if (!fetchedCandidate) continue;
                    fetchedCandidate.subtitleUrl = candidateUrl;
                    selected = fetchedCandidate;
                    if (state.assFallbackVttCache instanceof Map) {
                      state.assFallbackVttCache.set(candidateUrl, {
                        vtt: fetchedCandidate.vttContent,
                        styleProfile: fetchedCandidate.styleProfile,
                        cueSettings: fetchedCandidate.cueSettings,
                        cueCount: fetchedCandidate.cueCount,
                        conversionMode: fetchedCandidate.conversionMode,
                        sourceText: fetchedCandidate.sourceText
                      });
                    }
                    break;
                  }
                }
              }
            }
          }

          if (!selected && inlineNonAssCandidate) {
            selected = inlineNonAssCandidate;
          }

          if (!selected) {
            const detail = attemptErrors.join('|') || 'unknown';
            state.assLastError = `ass_to_vtt_empty:${detail}`;
            if (playerShell) playerShell.dataset.assLastError = state.assLastError;
            return false;
          }

          if (isStale()) {
            state.assLastError = 'ass_selection_stale';
            if (playerShell) playerShell.dataset.assLastError = state.assLastError;
            return false;
          }

          clearAssFallbackTrack();
          const assInfo = extractAssScriptInfo(
            typeof inlineContent === 'string' && inlineContent.trim()
              ? inlineContent
              : String(selected?.sourceText || '')
          );
          if (selected.styleProfile) {
            applyAssFallbackCueStyle(selected.styleProfile);
          } else {
            resetAssFallbackCueStyle();
          }

          const objectUrl = URL.createObjectURL(new Blob([selected.vttContent], { type: 'text/vtt' }));
          const trackEl = document.createElement('track');
          trackEl.kind = 'subtitles';
          trackEl.label = buildCanonicalSubtitleLabel(
            subtitleMeta?.label || '',
            subtitleMeta?.idioma || 'pt-BR',
            assInfo?.title || ''
          );
          trackEl.srclang = String(subtitleMeta?.idioma || 'pt-BR').trim() || 'pt-BR';
          trackEl.src = objectUrl;
          trackEl.default = true;
          video.appendChild(trackEl);

          state.assFallbackTrackEl = trackEl;
          state.assFallbackTrackObjectUrl = objectUrl;
          const resolvedSubtitleUrl =
            normalizeAssSubtitleFetchUrl(selected.subtitleUrl || safeUrl) ||
            toAbsoluteAssetUrl(selected.subtitleUrl || safeUrl) ||
            safeUrl;
          state.assSubtitleUrl = resolvedSubtitleUrl;
          state.assSubtitleMeta = subtitleMeta || null;
          state.assSubtitleSource = String(subtitleMeta?.source || state.assSubtitleSource || 'managed').trim() || 'managed';
          if (resolvedSubtitleUrl) {
            const normalizedCandidates = [resolvedSubtitleUrl];
            const previousCandidates = Array.isArray(state.assSubtitleCandidates)
              ? state.assSubtitleCandidates
              : [];
            previousCandidates.forEach((candidateUrl) => {
              const normalizedCandidateUrl = toAbsoluteAssetUrl(candidateUrl || '');
              const sanitizedCandidateUrl =
                normalizeAssSubtitleFetchUrl(candidateUrl || '') ||
                normalizedCandidateUrl;
              if (!sanitizedCandidateUrl || sanitizedCandidateUrl === resolvedSubtitleUrl) return;
              normalizedCandidates.push(sanitizedCandidateUrl);
            });
            state.assSubtitleCandidates = normalizedCandidates;
          }

          const textTrack = trackEl.track;
          if (textTrack) {
            textTrack.mode = 'showing';
          }
          let fallbackOptionId = String(state.activeSubtitleOptionId || '').trim().toLowerCase();
          if (!fallbackOptionId || fallbackOptionId === 'off') {
            const inferredIndex = inferActiveHlsSubtitleTrackIndex();
            if (Number.isInteger(inferredIndex) && inferredIndex >= 0) {
              fallbackOptionId = `hls:${inferredIndex}`;
            }
          }
          state.assFallbackOptionId = fallbackOptionId && fallbackOptionId !== 'off'
            ? fallbackOptionId
            : null;
          if (!String(state.activeSubtitleOptionId || '').trim() && state.assFallbackOptionId) {
            state.activeSubtitleOptionId = state.assFallbackOptionId;
          }
          setAssFallbackCueStyleActive(true);
          disableHlsSubtitleTrack();
          getSubtitleTracks().forEach((track) => {
            if (track !== textTrack) {
              track.mode = 'disabled';
            }
          });
          state.assLastError = null;
          if (playerShell) {
            delete playerShell.dataset.assLastError;
            playerShell.dataset.assCueCount = String(Math.max(0, Number(selected.cueCount || 0)));
            playerShell.dataset.assConversion = String(selected.conversionMode || 'strict');
          }
          return true;
        } catch (error) {
          state.assLastError = String(error?.message || 'ass_fallback_build_failed');
          if (playerShell) playerShell.dataset.assLastError = state.assLastError;
          console.warn('ASS fallback build failed:', state.assLastError);
          return false;
        }
      };

      const isAssWasmCspViolationMessage = (value = '') => {
        const text = String(value || '');
        if (!text) return false;
        const hasWasm = /webassembly\.instantiate/i.test(text);
        const hasCsp = /content security policy directive|csp/i.test(text);
        return hasWasm && hasCsp;
      };

      const isAssWorkerRuntimeFailureMessage = (value = '') => {
        const text = String(value || '').toLowerCase();
        if (!text) return false;
        if (!text.includes('subtitles-octopus')) return false;
        return (
          text.includes('failed to start a track') ||
          text.includes('worker error') ||
          text.includes('uncaught [object object]') ||
          text.includes('cannot read properties of null') ||
          text.includes('postmessage')
        );
      };

      const handleAssRuntimeCspBlock = () => {
        if (state.assCspBlocked) return;
        state.assCspBlocked = true;
        state.assRendererDisabled = true;
        state.assInitInFlight = false;
        state.assAutoAttachPending = false;
        if (playerShell) playerShell.dataset.assRendererDisabled = '1';

        const safeUrl = normalizeAssSubtitleFetchUrl(state.assSubtitleUrl || '') || toAbsoluteAssetUrl(state.assSubtitleUrl || '');
        const safeMeta = state.assSubtitleMeta ? { ...state.assSubtitleMeta } : null;
        const inlineContent = typeof safeMeta?.content === 'string' ? safeMeta.content : '';

        destroyAssRenderer({ preserveSelection: true });

        if (!safeUrl || !isAssSubtitleUrl(safeUrl)) {
          applyCaptionState();
          renderSettingsPopoverAuto();
          return;
        }

        const fallbackTrack = getActiveCanonicalSubtitleTrack();
        buildAssFallbackTrack(safeUrl, safeMeta, inlineContent)
          .then(async (ok) => {
            let runtimeReady = !!ok;
            if (!runtimeReady && fallbackTrack) {
              runtimeReady = await activateCanonicalNonAssFallback(fallbackTrack, {
                assUrl: safeUrl,
                assInlineContent: inlineContent
              });
            }
            state.assRendererFailed = !runtimeReady;
            playerShell.dataset.assSubtitles = runtimeReady ? 'fallback' : 'off';
            applyCaptionState();
            renderSettingsPopoverAuto();
          })
          .catch(() => {
            state.assRendererFailed = true;
            playerShell.dataset.assSubtitles = 'off';
            applyCaptionState();
            renderSettingsPopoverAuto();
          });
      };

      const handleAssRuntimeTrackFailure = (reason = 'ass_renderer_runtime_failure') => {
        const safeUrl = normalizeAssSubtitleFetchUrl(state.assSubtitleUrl || '') || toAbsoluteAssetUrl(state.assSubtitleUrl || '');
        if (!safeUrl || !isAssSubtitleUrl(safeUrl)) return;
        const normalizedReason = String(reason || 'ass_renderer_runtime_failure').trim() || 'ass_renderer_runtime_failure';
        rememberAssRendererTrackFailure(safeUrl, normalizedReason);
        state.assRendererFailed = true;
        state.assInitInFlight = false;
        state.assAutoAttachPending = false;
        state.assLastError = normalizedReason;
        if (playerShell) {
          playerShell.dataset.assLastError = normalizedReason;
          playerShell.dataset.assRendererDisabled = state.assRendererDisabled ? '1' : '0';
        }

        const safeMeta = state.assSubtitleMeta ? { ...state.assSubtitleMeta } : null;
        const inlineContent = typeof safeMeta?.content === 'string' ? safeMeta.content : '';
        destroyAssRenderer({ preserveSelection: true });

        const fallbackTrack = getActiveCanonicalSubtitleTrack();
        buildAssFallbackTrack(safeUrl, safeMeta, inlineContent)
          .then(async (ok) => {
            let runtimeReady = !!ok;
            if (!runtimeReady && fallbackTrack) {
              runtimeReady = await activateCanonicalNonAssFallback(fallbackTrack, {
                assUrl: safeUrl,
                assInlineContent: inlineContent
              });
            }
            state.assRendererFailed = !runtimeReady;
            if (playerShell) playerShell.dataset.assSubtitles = runtimeReady ? 'fallback' : 'off';
            applyCaptionState();
            renderSettingsPopoverAuto();
          })
          .catch(() => {
            state.assRendererFailed = true;
            if (playerShell) playerShell.dataset.assSubtitles = 'off';
            applyCaptionState();
            renderSettingsPopoverAuto();
          });
      };

      const bindAssRuntimeErrorGuard = () => {
        if (window.__berryAssRuntimeGuardBound) return;
        window.__berryAssRuntimeGuardBound = true;

        window.addEventListener('error', (event) => {
          const message = String(event?.message || '');
          const filename = String(event?.filename || '');
          const full = `${filename} ${message}`.toLowerCase();
          if (!full.includes('subtitles-octopus')) return;
          if (isAssWasmCspViolationMessage(full)) {
            handleAssRuntimeCspBlock();
            return;
          }
          if (isAssWorkerRuntimeFailureMessage(full)) {
            handleAssRuntimeTrackFailure(full);
          }
        }, true);

        window.addEventListener('unhandledrejection', (event) => {
          const reason = event?.reason;
          const message = String(reason?.message || reason || '');
          const full = message.toLowerCase();
          const mentionsOctopus = full.includes('subtitles-octopus') || state.assSubtitleEnabled || !!state.assSubtitleUrl;
          if (!mentionsOctopus) return;
          if (isAssWasmCspViolationMessage(full)) {
            handleAssRuntimeCspBlock();
            return;
          }
          if (isAssWorkerRuntimeFailureMessage(full)) {
            handleAssRuntimeTrackFailure(full);
          }
        }, true);
      };

      const destroyAssRenderer = ({ preserveSelection = false } = {}) => {
        state.assInitInFlight = false;
        clearAssFallbackTrack();
        if (!state.assRenderer) {
          if (!preserveSelection) {
            state.assSubtitleUrl = null;
            state.assSubtitleMeta = null;
            state.assSubtitleSource = null;
            state.assSubtitleCandidates = [];
          }
          state.assSubtitleEnabled = false;
          if (!preserveSelection) state.assRendererFailed = false;
          if (playerShell) playerShell.dataset.assSubtitles = 'off';
          if (!state.assLastError && playerShell) delete playerShell.dataset.assLastError;
          return;
        }
        try {
          state.assRenderer.dispose();
        } catch (_) {}
        state.assRenderer = null;
        if (!preserveSelection) {
          state.assSubtitleUrl = null;
          state.assSubtitleMeta = null;
          state.assSubtitleSource = null;
          state.assSubtitleCandidates = [];
        }
        state.assSubtitleEnabled = false;
        if (!preserveSelection) state.assRendererFailed = false;
        if (playerShell) playerShell.dataset.assSubtitles = 'off';
        if (!state.assLastError && playerShell) delete playerShell.dataset.assLastError;
      };

      const initAssRenderer = (subtitleUrl, subtitleMeta = null, expectedEpoch = null) => {
        const safeUrl = normalizeAssSubtitleFetchUrl(subtitleUrl || '') || toAbsoluteAssetUrl(subtitleUrl || '');
        if (!safeUrl || !isAssSubtitleUrl(safeUrl)) {
          destroyAssRenderer();
          return false;
        }
        if (state.assInitInFlight) return false;
        const previousAssUrl = normalizeAssSubtitleFetchUrl(state.assSubtitleUrl || '') || toAbsoluteAssetUrl(state.assSubtitleUrl || '');
        const subtitleSource = String(subtitleMeta?.source || state.assSubtitleSource || 'managed').trim() || 'managed';
        // Mantém a opção ASS visível no menu mesmo quando fallback falhar temporariamente.
        state.assSubtitleUrl = safeUrl;
        state.assSubtitleMeta = subtitleMeta || state.assSubtitleMeta || null;
        state.assSubtitleSource = subtitleSource;
        const nextCandidateUrls = [
          safeUrl,
          ...(Array.isArray(subtitleMeta?.candidateUrls) ? subtitleMeta.candidateUrls : [])
        ].filter((value, index, array) => {
          const normalized = normalizeAssSubtitleFetchUrl(value || '') || toAbsoluteAssetUrl(value || '');
          if (!normalized) return false;
          return array.findIndex((item) => {
            const normalizedItem = normalizeAssSubtitleFetchUrl(item || '') || toAbsoluteAssetUrl(item || '');
            return normalizedItem === normalized;
          }) === index;
        });
        state.assSubtitleCandidates = nextCandidateUrls;
        const isStale = () => Number.isFinite(Number(expectedEpoch)) && !isSubtitleSelectionEpochCurrent(Number(expectedEpoch));
        state.assInitInFlight = true;
        const inlineAssContent = typeof subtitleMeta?.content === 'string'
          ? String(subtitleMeta.content || '').trim()
          : '';
        const shouldUseInlineAssContent = !safeUrl && !!inlineAssContent;
        const releaseAssInitInFlight = () => {
          state.assInitInFlight = false;
        };

        const tryAssFallback = () => {
          if (isStale()) {
            releaseAssInitInFlight();
            return;
          }
          const inlineContent = typeof subtitleMeta?.content === 'string' ? subtitleMeta.content : '';
          buildAssFallbackTrack(safeUrl, subtitleMeta, inlineContent, expectedEpoch)
            .then((ok) => {
              releaseAssInitInFlight();
              if (isStale()) return;
              state.assRendererFailed = !ok;
              playerShell.dataset.assSubtitles = ok ? 'fallback' : 'off';
              applyCaptionState();
              renderSettingsPopoverAuto();
            })
            .catch(() => {
              releaseAssInitInFlight();
              if (isStale()) return;
              state.assRendererFailed = true;
              playerShell.dataset.assSubtitles = 'off';
              applyCaptionState();
              renderSettingsPopoverAuto();
            });
        };

        if (state.assRendererDisabled) {
          const existingFallbackTrack = getAssFallbackTextTrack();
          const canReuseExistingFallback =
            !!existingFallbackTrack &&
            !!previousAssUrl &&
            previousAssUrl === safeUrl;
          if (canReuseExistingFallback) {
            try {
              existingFallbackTrack.mode = 'showing';
            } catch (_) {}
            disableHlsSubtitleTrack();
            state.assSubtitleEnabled = false;
            if (playerShell) playerShell.dataset.assSubtitles = 'fallback';
            releaseAssInitInFlight();
            return true;
          }
          destroyAssRenderer({ preserveSelection: true });
          tryAssFallback();
          return false;
        }

        if (hasAssRendererTrackFailure(safeUrl)) {
          const existingFallbackTrack = getAssFallbackTextTrack();
          const canReuseExistingFallback =
            !!existingFallbackTrack &&
            !!previousAssUrl &&
            previousAssUrl === safeUrl;
          if (canReuseExistingFallback) {
            try {
              existingFallbackTrack.mode = 'showing';
            } catch (_) {}
            disableHlsSubtitleTrack();
            state.assSubtitleEnabled = false;
            if (playerShell) playerShell.dataset.assSubtitles = 'fallback';
            releaseAssInitInFlight();
            return true;
          }
          destroyAssRenderer({ preserveSelection: true });
          tryAssFallback();
          return false;
        }

        if (state.assCspBlocked) {
          destroyAssRenderer({ preserveSelection: true });
          tryAssFallback();
          return false;
        }

        if (ASS_RENDERER_FORCE_FALLBACK) {
          destroyAssRenderer({ preserveSelection: true });
          tryAssFallback();
          return false;
        }

        if (!ASS_WASM_SUPPORTED) {
          state.assRendererDisabled = true;
          if (playerShell) playerShell.dataset.assRendererDisabled = '1';
          destroyAssRenderer({ preserveSelection: true });
          tryAssFallback();
          return false;
        }

        if (typeof window.SubtitlesOctopus !== 'function') {
          state.assRendererDisabled = true;
          if (playerShell) playerShell.dataset.assRendererDisabled = '1';
          destroyAssRenderer({ preserveSelection: true });
          tryAssFallback();
          return false;
        }

        destroyAssRenderer({ preserveSelection: true });

        try {
          const workerAssetUrl = withAssAssetVersion(
            toAbsoluteAssetUrl(`${ASS_ASSETS_BASE}/subtitles-octopus-worker.js`) || `${ASS_ASSETS_BASE}/subtitles-octopus-worker.js`
          );
          const defaultFontUrl = withAssAssetVersion(
            toAbsoluteAssetUrl(`${ASS_ASSETS_BASE}/default.woff2`) || `${ASS_ASSETS_BASE}/default.woff2`
          );
          state.assRenderer = new window.SubtitlesOctopus({
            video,
            subUrl: safeUrl || null,
            subContent: shouldUseInlineAssContent ? inlineAssContent : null,
            workerUrl: workerAssetUrl,
            legacyWorkerUrl: workerAssetUrl,
            renderMode: 'wasm-blend',
            prescaleFactor: 1,
            prescaleHeightLimit: 0,
            maxRenderHeight: 0,
            fallbackFont: defaultFontUrl,
            defaultFont: defaultFontUrl,
            fonts: [],
            availableFonts: [],
            onError: (error) => {
              if (state.assRendererFailed) return;
              releaseAssInitInFlight();
              handleAssRuntimeTrackFailure(
                String(error?.message || error || 'ass_renderer_onerror')
              );
            },
            debug: false
          });
          disableHlsSubtitleTrack();
          getSubtitleTracks().forEach((track) => {
            track.mode = 'disabled';
          });
          state.assSubtitleUrl = safeUrl;
          state.assSubtitleMeta = subtitleMeta || null;
          state.assSubtitleSource = subtitleSource;
          state.assSubtitleEnabled = true;
          state.assRendererFailed = false;
          clearAssRendererTrackFailure(safeUrl);
          state.assLastError = null;
          if (playerShell) {
            playerShell.dataset.assRendererDisabled = '0';
            delete playerShell.dataset.assLastError;
          }
          playerShell.dataset.assSubtitles = 'on';
          setTimeout(() => {
            try { state.assRenderer?.resize(); } catch (_) {}
          }, 0);
          setTimeout(() => {
            try { state.assRenderer?.resize(); } catch (_) {}
          }, 120);
          releaseAssInitInFlight();
          return true;
        } catch (error) {
          state.assRendererFailed = true;
          releaseAssInitInFlight();
          const fullError = String(error?.message || error || 'ass_renderer_init_failed');
          if (isAssWasmCspViolationMessage(fullError)) {
            handleAssRuntimeCspBlock();
            return false;
          }
          handleAssRuntimeTrackFailure(fullError);
          return false;
        }
      };

      const setAssSubtitleEnabled = (enabled) => {
        if (!state.assRenderer || !state.assSubtitleUrl) return;
        if (enabled) {
          try {
            state.assRenderer.setTrackByUrl(state.assSubtitleUrl);
            disableHlsSubtitleTrack();
            getSubtitleTracks().forEach((track) => {
              track.mode = 'disabled';
            });
            state.assSubtitleEnabled = true;
            playerShell.dataset.assSubtitles = 'on';
          } catch (_) {}
          return;
        }
        try {
          state.assRenderer.freeTrack();
          state.assSubtitleEnabled = false;
          playerShell.dataset.assSubtitles = 'off';
        } catch (_) {}
      };

      const tryAutoAttachAssForCurrentHlsTrack = (reason = '') => {
        if (state.assAutoAttachPending) return;
        if (state.assRendererDisabled) return;
        if (String(state.activeSubtitleOptionId || '').trim().toLowerCase() === 'off') return;
        if (!state.hls || !Array.isArray(state.hls.subtitleTracks) || !state.hls.subtitleTracks.length) return;
        if (state.assRenderer || getAssFallbackTextTrack()) return;
        const currentIndex = inferActiveHlsSubtitleTrackIndex();
        if (!Number.isInteger(currentIndex) || currentIndex < 0) return;

        const hlsTrack = state.hls.subtitleTracks[currentIndex] || null;
        if (!hlsTrack) return;
        if (Number(state.hls.subtitleTrack) !== currentIndex) {
          try { state.hls.subtitleTrack = currentIndex; } catch (_) {}
        }

        const optionPrefLang = normalizeSubtitleLangAlias(
          hlsTrack?.lang || hlsTrack?.language,
          { allowOff: true }
        );
        const shouldUseManagedAss = shouldUseManagedAssForHlsTrack(hlsTrack, optionPrefLang, currentIndex);
        const key = [
          String(reason || '').trim(),
          `idx:${currentIndex}`,
          `lang:${String(optionPrefLang || '')}`,
          `managed:${shouldUseManagedAss ? 'yes' : 'no'}`,
          `ass:${String(state.assSubtitleUrl || '')}`
        ].join('|');

        const now = Date.now();
        if (key === String(state.assAutoAttachLastKey || '') && (now - Number(state.assAutoAttachLastAt || 0)) < 1200) {
          return;
        }
        state.assAutoAttachLastKey = key;
        state.assAutoAttachLastAt = now;
        state.assAutoAttachPending = true;

        const epoch = Number(state.subtitleSelectionEpoch || 0);
        const isStale = () => !isSubtitleSelectionEpochCurrent(epoch);

        setTimeout(async () => {
          try {
            if (isStale()) return;
            if (state.assRendererDisabled) return;
            if (!state.hls || !Array.isArray(state.hls.subtitleTracks)) return;
            if (state.assRenderer || getAssFallbackTextTrack()) return;
            if (String(state.activeSubtitleOptionId || '').trim().toLowerCase() === 'off') return;

            const activeIndex = inferActiveHlsSubtitleTrackIndex();
            if (!Number.isInteger(activeIndex) || activeIndex < 0) return;
            const activeTrack = state.hls.subtitleTracks[activeIndex] || null;
            if (!activeTrack) return;
            if (Number(state.hls.subtitleTrack) !== activeIndex) {
              try { state.hls.subtitleTrack = activeIndex; } catch (_) {}
            }
            const activePrefLang = normalizeSubtitleLangAlias(
              activeTrack?.lang || activeTrack?.language || optionPrefLang,
              { allowOff: true }
            );

            if (shouldUseManagedAssForHlsTrack(activeTrack, activePrefLang, activeIndex)) {
              if (state.assRendererDisabled) return;
              const assMeta = {
                ...(state.assSubtitleMeta || {}),
                source: 'managed'
              };
              const started = initAssRenderer(state.assSubtitleUrl, assMeta, epoch);
              if (!started) {
                await new Promise((resolve) => setTimeout(resolve, 90));
              }
              if (isStale()) return;
              if (state.assRenderer || getAssFallbackTextTrack()) {
                disableHlsSubtitleTrack();
                setHlsSubtitleDisplay(false);
                const manualIndex = Number(state.manualHlsSubtitleIndex);
                if (Number.isInteger(manualIndex) && manualIndex >= 0 && manualIndex !== activeIndex) {
                  scheduleHlsSubtitleSync(manualIndex, `hls:${manualIndex}`);
                  return;
                }
                state.activeSubtitleOptionId = `hls:${activeIndex}`;
                applyCaptionState();
                renderSettingsPopoverAuto();
                return;
              }
            }

            const shouldUseManagedForActiveTrack = shouldUseManagedAssForHlsTrack(activeTrack, activePrefLang, activeIndex);
            if (!shouldUseManagedForActiveTrack) {
              if (state.assRendererDisabled) return;
              const assVariant = await resolveAssSubtitleForHlsTrack(activeTrack, activeIndex).catch(() => null);
              if (!assVariant?.url) return;
              if (isStale()) return;
              const assMeta = {
                ...buildAssMetaFromHlsTrack(activeTrack, activeIndex),
                content: typeof assVariant.content === 'string' ? assVariant.content : null,
                source: 'hls'
              };
              const started = initAssRenderer(assVariant.url, assMeta, epoch);
              if (!started) {
                await new Promise((resolve) => setTimeout(resolve, 90));
              }
              if (isStale()) return;
              if (state.assRenderer || getAssFallbackTextTrack()) {
                disableHlsSubtitleTrack();
                setHlsSubtitleDisplay(false);
                const manualIndex = Number(state.manualHlsSubtitleIndex);
                if (Number.isInteger(manualIndex) && manualIndex >= 0 && manualIndex !== activeIndex) {
                  scheduleHlsSubtitleSync(manualIndex, `hls:${manualIndex}`);
                  return;
                }
                state.activeSubtitleOptionId = `hls:${activeIndex}`;
                applyCaptionState();
                renderSettingsPopoverAuto();
              }
            }
          } finally {
            state.assAutoAttachPending = false;
          }
        }, 0);
      };

      const applyAssSubtitleOffset = (offsetPx = 0) => {
        const canvas = state.assRenderer?.canvas;
        if (!canvas) return;
        const px = Math.max(0, Number(offsetPx) || 0);
        canvas.style.transition = 'transform 150ms ease';
        canvas.style.transform = px > 0 ? `translateY(-${px}px)` : 'translateY(0)';
      };

      const applyNativeSubtitleOffset = (offsetPx = 0) => {
        const px = Math.max(0, Number(offsetPx) || 0);
        const lineTarget = px > 0 ? -Math.max(2, Math.ceil(px / 24)) : null;
        const tracks = getSubtitleTracks();
        const assFallbackTrack = getAssFallbackTextTrack();

        tracks.forEach((track) => {
          if (assFallbackTrack && track === assFallbackTrack) return;
          const cues = track?.cues ? Array.from(track.cues) : [];
          cues.forEach((cue) => {
            if (!cue || typeof cue.line === 'undefined') return;
            if (!cueLayoutCache.has(cue)) {
              cueLayoutCache.set(cue, {
                line: cue.line,
                snapToLines: cue.snapToLines
              });
            }

            const original = cueLayoutCache.get(cue);
            try {
              if (lineTarget === null) {
                if (typeof original?.snapToLines !== 'undefined') cue.snapToLines = original.snapToLines;
                cue.line = original?.line;
              } else {
                cue.snapToLines = true;
                cue.line = lineTarget;
              }
            } catch (_) {}
          });
        });
      };

      const applySubtitleOffset = (offsetPx = 0) => {
        const px = Math.max(0, Number(offsetPx) || 0);
        state.subtitleOffsetPx = px;
        applyAssSubtitleOffset(px);
        applyNativeSubtitleOffset(px);
      };

      const getSubtitleLiftOffsetPx = () => {
        const controlsHeight = Math.round(mediaControls?.getBoundingClientRect?.().height || 0);
        if (controlsHeight > 0) {
          const dynamic = Math.round(controlsHeight * 0.38);
          return Math.max(30, Math.min(58, dynamic));
        }
        return 44;
      };

      const clearSubtitleLiftTimer = () => {
        if (!subtitleLiftTimer) return;
        clearTimeout(subtitleLiftTimer);
        subtitleLiftTimer = null;
      };

      const shouldKeepUiVisible = () => {
        return !!(
          state.sliderDrag ||
          state.volumeDrag ||
          state.settingsPopoverOpen ||
          state.episodesPopoverOpen ||
          state.commentsPanelOpen ||
          video.paused
        );
      };

      const setSubtitleLiftActive = (active) => {
        const next = !!active;
        if (state.subtitleLiftActive === next) {
          if (next) {
            applySubtitleOffset(getSubtitleLiftOffsetPx());
          }
          return;
        }
        state.subtitleLiftActive = next;
        if (next) {
          applySubtitleOffset(getSubtitleLiftOffsetPx());
        } else {
          applySubtitleOffset(0);
        }
      };

      const setControlsVisible = (visible) => {
        const next = !!visible;
        if (state.controlsVisible === next) {
          if (next) setSubtitleLiftActive(true);
          syncHeaderTitleState();
          updateNextEpisodePrompt();
          return;
        }
        const wasVisible = state.controlsVisible;
        state.controlsVisible = next;
        playerShell.classList.toggle('ui-controls-hidden', !next);
        setSubtitleLiftActive(next);
        syncHeaderTitleState();
        if (next && !wasVisible) {
          state.nextPromptShownForUiSession = false;
        }
        if (!next) {
          hideNextEpisodePrompt();
        } else {
          updateNextEpisodePrompt();
        }
      };

      const scheduleSubtitleLiftDown = (delay = 1700) => {
        clearSubtitleLiftTimer();
        if (shouldKeepUiVisible()) {
          setControlsVisible(true);
          return;
        }
        subtitleLiftTimer = setTimeout(() => {
          if (shouldKeepUiVisible() || controlsPointerInside) return;
          setControlsVisible(false);
        }, delay);
      };

      const markSubtitleUiActivity = (delay = 1700) => {
        setControlsVisible(true);
        scheduleSubtitleLiftDown(delay);
      };

      const shouldKeepSubtitleLift = () => shouldKeepUiVisible() || state.controlsVisible;

      const bindSubtitleTrackOffsetSync = () => {
        const tracks = getSubtitleTracks();
        tracks.forEach((track) => {
          if (!track || track.__berryOffsetSyncBound) return;
          track.__berryOffsetSyncBound = true;
          const sync = () => {
            if (state.subtitleOffsetPx > 0) {
              applyNativeSubtitleOffset(state.subtitleOffsetPx);
            }
          };
          try { track.addEventListener('cuechange', sync); } catch (_) {}
          try { track.addEventListener('addcue', sync); } catch (_) {}
        });
      };

      const collectSubtitleOptions = () => {
        if (USE_CANONICAL_SUBTITLE_CONTROLLER) {
          const catalogTracks = getCanonicalSubtitleTracks();
          const options = [{
            id: 'off',
            type: 'off',
            label: 'Nenhum',
            prefLang: 'off'
          }];

          catalogTracks.forEach((track) => {
            options.push({
              id: track.id,
              type: 'track',
              label: track.label || getSubtitleLanguageDisplayName(track.rawLang),
              prefLang: normalizePrivacyLang(track.prefLang || track.rawLang, { allowOff: false }) || track.rawLang || null,
              track
            });
          });

          const activeId = String(state.activeSubtitleOptionId || '').trim();
          const selectedId = activeId && options.some((option) => option.id === activeId)
            ? activeId
            : 'off';

          return {
            options,
            selectedId
          };
        }

        const options = [{
          id: 'off',
          type: 'off',
          label: 'Nenhum',
          prefLang: 'off'
        }];

        let selectedId = 'off';
        const hasHlsTracks = !!(state.hls && Array.isArray(state.hls.subtitleTracks) && state.hls.subtitleTracks.length > 0);
        const hasAssAvailable = !!state.assSubtitleUrl;
        const showDedicatedAssOption = false;
        const nativeTracks = getSubtitleTracks();
        const assFallbackTrack = getAssFallbackTextTrack();
        const hasAssFallbackTrack = !!assFallbackTrack;
        const assFallbackIndex = hasAssFallbackTrack ? nativeTracks.findIndex((track) => track === assFallbackTrack) : -1;
        const assFallbackActive = hasAssFallbackTrack && assFallbackTrack.mode === 'showing';

        if (showDedicatedAssOption) {
          const assLang = normalizeLangToken(
            state.assSubtitleMeta?.idioma || state.assSubtitleMeta?.lang,
            { allowOff: true }
          );
          const baseAssLabel = String(state.assSubtitleMeta?.label || '').trim() || 'Legenda ASS/SSA';
          const assLabel = `${baseAssLabel} · ASS (Estilo)`;
          const assPrefLang = normalizePrivacyLang(assLang, { allowOff: false });
          options.push({
            id: 'ass:original',
            type: 'ass',
            label: assLabel,
            prefLang: assPrefLang
          });
          if (state.assSubtitleEnabled || assFallbackActive) {
            selectedId = 'ass:original';
          }
        }

        if (hasHlsTracks) {
          let selectedOptionId = null;
          const seenHlsOptionKeys = new Set();
          const firstHlsOptionIdByKey = new Map();
          state.hls.subtitleTracks.forEach((track, index) => {
            if (isHlsSubtitleTrackExcluded(track, index)) return;
            const prefLang = normalizePrivacyLang(track?.lang, { allowOff: true });
            const baseLabel = buildTrackLabel(track, 'Legenda', index);
            const label = showDedicatedAssOption ? `${baseLabel} · HLS` : baseLabel;
            const dedupeKey = `${String(label || '').trim().toLowerCase()}|${String(prefLang || '').trim().toLowerCase()}`;
            if (seenHlsOptionKeys.has(dedupeKey)) {
              if (Number(state.hls.subtitleTrack) === index && firstHlsOptionIdByKey.has(dedupeKey)) {
                selectedOptionId = firstHlsOptionIdByKey.get(dedupeKey);
              }
              return;
            }
            const option = {
              id: `hls:${index}`,
              type: 'hls',
              index,
              label,
              prefLang
            };
            seenHlsOptionKeys.add(dedupeKey);
            firstHlsOptionIdByKey.set(dedupeKey, option.id);
            options.push(option);
            if (Number(state.hls.subtitleTrack) === index) {
              selectedOptionId = option.id;
            }
          });
          if (selectedId === 'off' && selectedOptionId) {
            selectedId = selectedOptionId;
          }
        }

        if (hasAssFallbackTrack && assFallbackIndex >= 0 && !hasHlsTracks) {
          options.push({
            id: 'native:fallback',
            type: 'native-ass',
            index: assFallbackIndex,
            label: buildTrackLabel(
              {
                name: assFallbackTrack.label,
                language: assFallbackTrack.language
              },
              'Legenda',
              assFallbackIndex
            ),
            prefLang: normalizePrivacyLang(assFallbackTrack.language, { allowOff: true })
          });
          if (selectedId === 'off' && assFallbackActive) {
            selectedId = 'native:fallback';
          }
        }

        const shouldListNative = !hasHlsTracks && !hasAssFallbackTrack;
        if (shouldListNative) {
          nativeTracks.forEach((track, index) => {
            options.push({
              id: `native:${index}`,
              type: 'native',
              index,
              label: buildTrackLabel(track, 'Legenda', index),
              prefLang: normalizePrivacyLang(track?.language, { allowOff: true })
            });
          });
          const selectedIndex = nativeTracks.findIndex((track) => track.mode === 'showing');
          if (selectedId === 'off' && selectedIndex >= 0) {
            selectedId = `native:${selectedIndex}`;
          }
        }

        const preferredSelectedId = String(state.activeSubtitleOptionId || '').trim();
        if (preferredSelectedId && options.some((option) => option.id === preferredSelectedId)) {
          selectedId = preferredSelectedId;
        }

        return {
          options,
          selectedId
        };
      };

      const collectAudioOptions = () => {
        const options = [];
        if (state.hls && Array.isArray(state.hls.audioTracks) && state.hls.audioTracks.length > 0) {
          state.hls.audioTracks.forEach((track, index) => {
            options.push({
              id: `hls:${index}`,
              type: 'hls',
              index,
              label: buildTrackLabel(track, 'Áudio', index),
              prefLang: normalizePrivacyLang(track?.lang, { allowOff: false })
            });
          });
          const current = Number(state.hls.audioTrack);
          const selectedId = current >= 0 ? `hls:${current}` : 'hls:0';
          return { options, selectedId };
        }

        options.push({
          id: 'default',
          type: 'default',
          label: 'Áudio padrão',
          disabled: true,
          prefLang: normalizeLangToken(state.userPrefs.audioLang)
        });
        return { options, selectedId: 'default' };
      };

      const getHlsLevelFrameRate = (level) => {
        const raw = Number(level?.frameRate || level?.attrs?.['FRAME-RATE'] || 0);
        return Number.isFinite(raw) && raw > 0 ? raw : 0;
      };

      const buildQualityLabel = (level) => {
        if (!level) return 'Auto';
        const height = Math.max(0, Number(level?.height || 0));
        if (!height) return 'Auto';
        const fps = getHlsLevelFrameRate(level);
        const fpsSuffix = fps >= 50 ? '60' : '';
        return `${height}p${fpsSuffix}`;
      };

      const collectQualityOptions = () => {
        const fallback = {
          options: [{ id: 'auto', type: 'auto', label: 'Auto', disabled: true }],
          selectedId: 'auto',
          selectedLabel: 'Auto'
        };
        if (!state.hls || !Array.isArray(state.hls.levels) || !state.hls.levels.length) {
          return fallback;
        }

        const levelOptions = state.hls.levels.map((level, index) => ({
          id: `level:${index}`,
          type: 'level',
          index,
          label: buildQualityLabel(level),
          sortHeight: Math.max(0, Number(level?.height || 0)),
          sortFps: getHlsLevelFrameRate(level),
          sortBandwidth: Math.max(0, Number(level?.bitrate || level?.attrs?.BANDWIDTH || 0))
        }));

        levelOptions.sort((left, right) => {
          if (right.sortHeight !== left.sortHeight) return right.sortHeight - left.sortHeight;
          if (right.sortFps !== left.sortFps) return right.sortFps - left.sortFps;
          return right.sortBandwidth - left.sortBandwidth;
        });

        const options = levelOptions.map((option) => ({
          id: option.id,
          type: option.type,
          index: option.index,
          label: option.label
        }));
        options.push({ id: 'auto', type: 'auto', label: 'Auto' });

        const manualLevel = Number(state.hls.manualLevel);
        const selectedId = Number.isInteger(manualLevel) && manualLevel >= 0
          ? `level:${manualLevel}`
          : 'auto';
        let selectedLabel = 'Auto';
        if (selectedId === 'auto') {
          const currentLevel = Number(state.hls.currentLevel);
          if (Number.isInteger(currentLevel) && currentLevel >= 0 && state.hls.levels[currentLevel]) {
            selectedLabel = `Auto (${buildQualityLabel(state.hls.levels[currentLevel])})`;
          }
        } else {
          const selected = options.find((option) => option.id === selectedId);
          selectedLabel = selected?.label || 'Auto';
        }

        return {
          options,
          selectedId,
          selectedLabel
        };
      };

      const updateAutoplayToggleUi = () => {
        const on = !!state.userPrefs.autoplay;
        settingsAutoplayToggle.dataset.state = on ? 'on' : 'off';
        settingsMainAutoplayRow.setAttribute('aria-pressed', on ? 'true' : 'false');
      };

      const getSelectedOptionLabel = (data, fallback = 'N/D') => {
        const selected = (data?.options || []).find((option) => option.id === data?.selectedId);
        return selected?.label || fallback;
      };

      const setSettingsView = (view) => {
        const nextView = view === 'audio' || view === 'subtitle' || view === 'quality' ? view : 'main';
        state.settingsView = nextView;
        const isMain = nextView === 'main';
        settingsMenuMain.classList.toggle('hidden', !isMain);
        settingsMenuSub.classList.toggle('hidden', isMain);
        if (!isMain) {
          settingsSubTitle.textContent = nextView === 'audio'
            ? 'Áudio'
            : nextView === 'quality'
              ? 'Qualidade'
              : 'Legenda';
        }
      };

      const createRadioOptionButton = (option, selectedId, handler) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'settings-radio-btn';
        if (option.id === selectedId) btn.classList.add('active');
        btn.innerHTML = `
          <span class="settings-radio-indicator" aria-hidden="true"></span>
          <span class="settings-radio-label">${escapeHtml(option.label || 'N/D')}</span>
        `;
        if (option.disabled) {
          btn.disabled = true;
          btn.style.opacity = '0.6';
          btn.style.cursor = 'not-allowed';
        } else {
          let handled = false;
          const triggerSelection = () => {
            if (handled) return;
            handled = true;
            watchDebugState.lastSubtitleOptionPointerId = String(option.id || '');
            watchDebugState.lastSubtitleOptionPointerType = String(option.type || '');
            handler(option);
          };
          // Em alguns navegadores/eventos HLS, o menu re-renderiza entre pointerdown/click.
          // Aplicamos seleção já no pointerdown para não perder a interação do usuário.
          btn.addEventListener('pointerdown', (event) => {
            event.preventDefault();
            lastSettingsOptionPointerSelectionAt = Date.now();
            triggerSelection();
          });
          btn.addEventListener('click', (event) => {
            event.preventDefault();
            if (Date.now() - Number(lastSettingsOptionPointerSelectionAt || 0) < 650) {
              return;
            }
            triggerSelection();
          });
        }
        return btn;
      };

      const applySubtitleSelection = async (selected) => {
        if (!selected) return;
        if (USE_CANONICAL_SUBTITLE_CONTROLLER) {
          const selectionEpoch = nextSubtitleSelectionEpoch();
          watchDebugState.lastSubtitleSelectionRequestId = String(selected.id || '');
          watchDebugState.lastSubtitleSelectionRequestType = String(selected.type || '');

          if (selected.type === 'off') {
            state.activeSubtitleOptionId = 'off';
            state.userPrefs.subtitleLang = 'off';
            state.subtitleInitialSelectionApplied = true;
            deactivateCanonicalSubtitleOutputs();
            clearStoredSubtitleTrackPreference();
            applyCaptionState();
            renderSettingsPopover();
            await saveUserPrivacyPrefs({ preferredSubtitleLang: 'off' });
            return;
          }

          const track = selected.track || findCanonicalSubtitleTrackById(selected.id);
          if (!track) {
            state.activeSubtitleOptionId = 'off';
            state.userPrefs.subtitleLang = 'off';
            deactivateCanonicalSubtitleOutputs();
            clearStoredSubtitleTrackPreference();
            applyCaptionState();
            renderSettingsPopover();
            await saveUserPrivacyPrefs({ preferredSubtitleLang: 'off' });
            return;
          }

          state.activeSubtitleOptionId = track.id;
          state.userPrefs.subtitleLang = normalizePrivacyLang(track.prefLang || track.rawLang, { allowOff: false }) || track.rawLang || null;
          state.subtitleInitialSelectionApplied = true;
          const activated = await activateCanonicalSubtitleTrackRuntime(track, selectionEpoch);
          if (!isSubtitleSelectionEpochCurrent(selectionEpoch)) return;
          if (!activated) {
            state.activeSubtitleOptionId = 'off';
            state.userPrefs.subtitleLang = 'off';
            deactivateCanonicalSubtitleOutputs();
            clearStoredSubtitleTrackPreference();
          } else {
            persistStoredSubtitleTrackPreference(track);
          }
          applyCaptionState();
          renderSettingsPopover();
          const prefLang = activated
            ? (normalizePrivacyLang(track.prefLang || track.rawLang, { allowOff: false }) || null)
            : 'off';
          if (prefLang) {
            await saveUserPrivacyPrefs({ preferredSubtitleLang: prefLang });
          }
          return;
        }

        const selectionEpoch = nextSubtitleSelectionEpoch();
        const isStale = () => !isSubtitleSelectionEpochCurrent(selectionEpoch);
        watchDebugState.lastSubtitleSelectionRequestId = String(selected.id || '');
        watchDebugState.lastSubtitleSelectionRequestType = String(selected.type || '');
        if (selected.type === 'ass') {
          state.activeSubtitleOptionId = selected.id || 'ass:original';
          state.assFallbackOptionId = null;
          state.manualHlsSubtitleIndex = null;
          state.pendingHlsSubtitleTargetIndex = null;
          clearHlsSubtitleSyncTimers();
          if (state.assSubtitleMeta && typeof state.assSubtitleMeta === 'object') {
            state.assSubtitleMeta = {
              ...state.assSubtitleMeta,
              candidateUrls: Array.isArray(state.assSubtitleCandidates)
                ? state.assSubtitleCandidates.slice()
                : []
            };
          }
          if (!state.assRenderer && state.assSubtitleUrl) {
            initAssRenderer(state.assSubtitleUrl, state.assSubtitleMeta || null, selectionEpoch);
          } else {
            setAssSubtitleEnabled(true);
          }
          if (isStale()) return;
          state.userPrefs.subtitleLang = selected.prefLang || null;
          applyCaptionState();
          renderSettingsPopover();
          const assPrefLang = selected.prefLang || null;
          if (assPrefLang) {
            await saveUserPrivacyPrefs({ preferredSubtitleLang: assPrefLang });
          }
          return;
        }

        if (selected.type === 'off') {
          state.activeSubtitleOptionId = 'off';
          state.assFallbackOptionId = null;
          state.manualHlsSubtitleIndex = null;
          state.pendingHlsSubtitleTargetIndex = null;
          clearHlsSubtitleSyncTimers();
          if (state.assSubtitleUrl && state.assRenderer) {
            setAssSubtitleEnabled(false);
          }
          disableHlsSubtitleTrack();
          setHlsSubtitleDisplay(false);
          getSubtitleTracks().forEach((track) => {
            track.mode = 'disabled';
          });
          if (isStale()) return;
          state.userPrefs.subtitleLang = 'off';
          applyCaptionState();
          renderSettingsPopover();
          await saveUserPrivacyPrefs({ preferredSubtitleLang: 'off' });
          return;
        }

        if (selected.type === 'hls' || selected.type === 'native' || selected.type === 'native-ass') {
          ensureManagedAssStyleProfileReady().catch(() => false);
        }

        state.activeSubtitleOptionId = selected.id || state.activeSubtitleOptionId || 'off';

        if (state.assSubtitleUrl && state.assRenderer) {
          setAssSubtitleEnabled(false);
        }

        if (selected.type === 'hls' && state.hls) {
          clearHlsSubtitleSyncTimers();
          state.assAutoAttachPending = false;
          state.assAutoAttachLastKey = '';
          clearAssFallbackTrack();
          state.assSubtitleEnabled = false;
          const targetIndex = Number(selected.index);
          state.manualHlsSubtitleIndex = Number.isFinite(targetIndex) && targetIndex >= 0 ? targetIndex : null;
          state.pendingHlsSubtitleTargetIndex = Number.isFinite(targetIndex) && targetIndex >= 0 ? targetIndex : null;
          const hlsTrack = Number.isFinite(targetIndex) && targetIndex >= 0
            ? (state.hls.subtitleTracks?.[targetIndex] || null)
            : null;
          const hasDedicatedManagedAss =
            !!state.assSubtitleUrl &&
            String(state.assSubtitleSource || '').trim().toLowerCase() !== 'hls';
          const managedTargetIndex = hasDedicatedManagedAss ? findManagedAssTargetHlsSubtitleIndex() : -1;
          const forceManagedAssByTarget =
            hasDedicatedManagedAss &&
            Number.isFinite(targetIndex) &&
            targetIndex >= 0 &&
            Number.isInteger(managedTargetIndex) &&
            managedTargetIndex >= 0 &&
            targetIndex === managedTargetIndex;
          const managedPrimaryLang = getManagedAssPrimaryLang();
          const forceManagedAssByLang =
            hasDedicatedManagedAss &&
            !!managedPrimaryLang &&
            managedPrimaryLang !== 'off' &&
            normalizeSubtitleLangAlias(selected.prefLang, { allowOff: true }) === managedPrimaryLang;
          const shouldUseManagedAssForTrack =
            !!hlsTrack &&
            hasDedicatedManagedAss &&
            (
              forceManagedAssByTarget ||
              forceManagedAssByLang ||
              shouldUseManagedAssForHlsTrack(
                hlsTrack,
                selected.prefLang || hlsTrack?.lang || hlsTrack?.language,
                targetIndex
              )
            );

          if (shouldUseManagedAssForTrack) {
            state.pendingHlsSubtitleTargetIndex = null;
            clearHlsSubtitleSyncTimers();
            const assMeta = {
              ...(state.assSubtitleMeta || {}),
              source: 'managed'
            };
            const started = initAssRenderer(state.assSubtitleUrl, assMeta, selectionEpoch);
            if (!started) {
              await new Promise((resolve) => setTimeout(resolve, 90));
            }
            if (isStale()) return;
            if (state.assRenderer || getAssFallbackTextTrack()) {
              disableHlsSubtitleTrack();
              setHlsSubtitleDisplay(false);
              state.userPrefs.subtitleLang = selected.prefLang || null;
              applyCaptionState();
              renderSettingsPopover();
              const prefLang = selected.prefLang || null;
              if (prefLang) {
                await saveUserPrivacyPrefs({ preferredSubtitleLang: prefLang });
              }
              return;
            }
          }

          if (hlsTrack && !shouldUseManagedAssForTrack) {
            const assVariant = await resolveAssSubtitleForHlsTrack(hlsTrack, targetIndex).catch(() => null);
            if (isStale()) return;
            if (assVariant?.url) {
              state.pendingHlsSubtitleTargetIndex = null;
              clearHlsSubtitleSyncTimers();
              const assMeta = {
                ...buildAssMetaFromHlsTrack(hlsTrack, targetIndex),
                content: typeof assVariant.content === 'string' ? assVariant.content : null,
                source: 'hls'
              };
              const started = initAssRenderer(assVariant.url, assMeta, selectionEpoch);
              if (!started) {
                await new Promise((resolve) => setTimeout(resolve, 90));
              }
              if (isStale()) return;
              if (state.assRenderer || getAssFallbackTextTrack()) {
                disableHlsSubtitleTrack();
                setHlsSubtitleDisplay(false);
                state.userPrefs.subtitleLang = selected.prefLang || null;
                applyCaptionState();
                renderSettingsPopover();
                const prefLang = selected.prefLang || null;
                if (prefLang) {
                  await saveUserPrivacyPrefs({ preferredSubtitleLang: prefLang });
                }
                return;
              }
            }
          }

          const tracks = getSubtitleTracks();
          tracks.forEach((track) => {
            track.mode = 'disabled';
          });
          setHlsSubtitleDisplay(true);
          if (Number.isFinite(targetIndex) && targetIndex >= 0) {
            const currentIndex = Number(state.hls.subtitleTrack);
            if (!Number.isFinite(currentIndex) || currentIndex !== targetIndex) {
              state.hls.subtitleTrack = targetIndex;
            }
            scheduleHlsSubtitleSync(targetIndex, `hls:${targetIndex}`);
          }
        } else if (selected.type === 'native' || selected.type === 'native-ass') {
          state.assFallbackOptionId = null;
          state.manualHlsSubtitleIndex = null;
          state.pendingHlsSubtitleTargetIndex = null;
          clearHlsSubtitleSyncTimers();
          disableHlsSubtitleTrack();
          setHlsSubtitleDisplay(true);
          const tracks = getSubtitleTracks();
          const selectedTrack = tracks[selected.index] || null;
          tracks.forEach((track, idx) => {
            track.mode = idx === selected.index ? 'showing' : 'disabled';
          });
          forceShowTextTrack(selectedTrack);
        }

        if (isStale()) return;
        state.userPrefs.subtitleLang = selected.prefLang || null;
        applyCaptionState();
        renderSettingsPopover();

        const prefLang = selected.prefLang || null;
        if (prefLang) {
          await saveUserPrivacyPrefs({ preferredSubtitleLang: prefLang });
        }
      };

      const applyAudioSelection = async (selected) => {
        if (!selected) return;
        if (selected.type === 'hls' && state.hls) {
          state.hls.audioTrack = selected.index;
        }
        state.userPrefs.audioLang = selected.prefLang || state.userPrefs.audioLang || null;
        renderSettingsPopover();
        const prefLang = selected.prefLang || null;
        if (prefLang) {
          await saveUserPrivacyPrefs({ preferredAudioLang: prefLang });
        }
      };

      const applyQualitySelection = async (selected) => {
        if (!selected || !state.hls) return;
        if (selected.type === 'auto') {
          state.qualityPreference = 'auto';
          try {
            state.hls.loadLevel = -1;
            state.hls.nextLevel = -1;
            if ('autoLevelCapping' in state.hls) {
              state.hls.autoLevelCapping = -1;
            }
          } catch (_) {}
          renderSettingsPopover();
          return;
        }

        const targetLevel = Number(selected.index);
        if (!Number.isInteger(targetLevel) || targetLevel < 0) return;
        state.qualityPreference = `level:${targetLevel}`;
        try {
          if ('autoLevelCapping' in state.hls) {
            state.hls.autoLevelCapping = targetLevel;
          }
          state.hls.loadLevel = targetLevel;
          state.hls.nextLevel = targetLevel;
        } catch (_) {}
        renderSettingsPopover();
      };

      const renderSettingsSubView = () => {
        settingsSubList.innerHTML = '';
        const isAudio = state.settingsView === 'audio';
        const isQuality = state.settingsView === 'quality';
        const data = isAudio
          ? collectAudioOptions()
          : isQuality
            ? collectQualityOptions()
            : collectSubtitleOptions();
        const handler = isAudio
          ? applyAudioSelection
          : isQuality
            ? applyQualitySelection
            : applySubtitleSelection;

        if (!data.options.length) {
          settingsSubList.innerHTML = `<div class="settings-empty">Sem opções de ${isAudio ? 'áudio' : isQuality ? 'qualidade' : 'legenda'} disponíveis.</div>`;
          return;
        }

        data.options.forEach((option) => {
          settingsSubList.appendChild(createRadioOptionButton(option, data.selectedId, handler));
        });
      };

      const renderSettingsPopover = () => {
        const subtitleData = collectSubtitleOptions();
        const audioData = collectAudioOptions();
        const qualityData = collectQualityOptions();
        settingsMainSubtitleValue.textContent = getSelectedOptionLabel(subtitleData, 'Nenhum');
        settingsMainAudioValue.textContent = getSelectedOptionLabel(audioData, 'N/D');
        settingsMainQualityValue.textContent = qualityData.selectedLabel || 'Auto';
        updateAutoplayToggleUi();
        setSettingsView(state.settingsView);
        if (state.settingsView === 'audio' || state.settingsView === 'subtitle' || state.settingsView === 'quality') {
          renderSettingsSubView();
        }
      };

      const renderSettingsPopoverAuto = () => {
        if (!state.settingsPopoverOpen) return;
        // Evita re-render automático durante interação na lista de opções.
        if (state.settingsView === 'subtitle' || state.settingsView === 'audio' || state.settingsView === 'quality') return;
        renderSettingsPopover();
      };

      const setSettingsPopoverOpen = (open) => {
        state.settingsPopoverOpen = !!open;
        settingsPopover.classList.toggle('open', !!open);
        settingsPopover.setAttribute('aria-hidden', open ? 'false' : 'true');
        if (open) {
          setControlsVisible(true);
          clearSubtitleLiftTimer();
        } else if (!shouldKeepSubtitleLift()) {
          scheduleSubtitleLiftDown(380);
        }
      };

      const positionSettingsPopover = () => {
        const rect = settingsBtn.getBoundingClientRect();
        const width = Math.min(340, Math.max(240, window.innerWidth - 24));
        const half = width / 2;
        const minLeft = 12 + half;
        const maxLeft = window.innerWidth - 12 - half;
        const left = clamp(rect.left + rect.width / 2, minLeft, maxLeft);
        const top = Math.max(14, rect.top - 8);
        settingsPopover.style.width = `${width}px`;
        settingsPopover.style.left = `${left}px`;
        settingsPopover.style.top = `${top}px`;
      };

      const toggleSettingsPopover = () => {
        if (state.settingsPopoverOpen) {
          setSettingsPopoverOpen(false);
          return;
        }
        setEpisodesPopoverOpen(false);
        state.settingsView = 'main';
        renderSettingsPopover();
        positionSettingsPopover();
        setSettingsPopoverOpen(true);
      };

      const shouldForceSubtitlesOff = () => {
        const selectedId = String(state.activeSubtitleOptionId || '').trim().toLowerCase();
        return selectedId === 'off';
      };

      const enforceSubtitlesOffState = () => {
        if (!shouldForceSubtitlesOff()) return false;
        state.activeSubtitleOptionId = 'off';
        if (state.assSubtitleUrl && state.assRenderer && state.assSubtitleEnabled) {
          setAssSubtitleEnabled(false);
        }
        disableHlsSubtitleTrack();
        setHlsSubtitleDisplay(false);
        getSubtitleTracks().forEach((track) => {
          try {
            track.mode = 'disabled';
          } catch (_) {}
        });
        return true;
      };

      const applyCaptionState = () => {
        syncWatchDebugState();
        if (USE_CANONICAL_SUBTITLE_CONTROLLER) {
          syncManagedAssDebugDataset();
          const catalogTracks = getCanonicalSubtitleTracks();
          const activeId = String(state.activeSubtitleOptionId || '').trim();
          if (activeId.toLowerCase() === 'off') {
            if (state.assRenderer && state.assSubtitleEnabled) {
              setAssSubtitleEnabled(false);
            }
            disableHlsSubtitleTrack();
            setHlsSubtitleDisplay(false);
            getSubtitleTracks().forEach((track) => {
              try {
                track.mode = 'disabled';
              } catch (_) {}
            });
            setSubtitleRuntimeState(null, 'off', null);
          }
          const activeTrack = activeId && activeId.toLowerCase() !== 'off'
            ? findCanonicalSubtitleTrackById(activeId)
            : null;
          const dynamicTrack = getAssFallbackTextTrack();
          const allSubtitleTracks = getSubtitleTracks();
          const staticNativeTracks = allSubtitleTracks.filter((track) => track && track !== dynamicTrack);
          const hasAssActive = !!(state.assRenderer && state.assSubtitleEnabled);
          const hasDynamicActive = !!(dynamicTrack && dynamicTrack.mode === 'showing');
          const hasNativeActive = staticNativeTracks.some((track) => {
            try {
              return track?.mode === 'showing';
            } catch {
              return false;
            }
          });
          const hasHlsActive = !!(
            activeTrack &&
            Number.isInteger(Number(activeTrack.hlsIndex)) &&
            Number(activeTrack.hlsIndex) >= 0 &&
            Number(state.hls?.subtitleTrack) === Number(activeTrack.hlsIndex) &&
            !hasAssActive &&
            !hasDynamicActive
          );
          const enabled = !!(activeTrack && (hasAssActive || hasDynamicActive || hasNativeActive || hasHlsActive));
          const shouldUseNativeVttCueStyle =
            enabled &&
            !!activeTrack &&
            shouldUseNativeVttCueStyleForTrack(activeTrack);
          const shouldKeepAssCueStyleForNative =
            !!assFallbackCueStyleProfile &&
            enabled &&
            !!state.subtitleStyleTrackId &&
            state.subtitleStyleTrackId === activeTrack?.id;

          bindSubtitleTrackOffsetSync();
          setAssFallbackCueStyleActive(
            !!assFallbackCueStyleProfile &&
            (String(state.subtitleRuntimeMode || '').trim().toLowerCase() === 'ass-fallback' || shouldKeepAssCueStyleForNative)
          );
          setNativeVttCueStyleActive(shouldUseNativeVttCueStyle);

          if (!catalogTracks.length) {
            captionsBtn.disabled = true;
            captionsBtn.dataset.caption = 'off';
            setHlsSubtitleDisplay(false);
            setNativeVttCueStyleActive(false);
            renderSettingsPopoverAuto();
            return;
          }

          captionsBtn.disabled = false;
          captionsBtn.dataset.caption = enabled ? 'on' : 'off';
          setHlsSubtitleDisplay(enabled && hasHlsActive);

          if (enabled && state.subtitleLiftActive) {
            applySubtitleOffset(getSubtitleLiftOffsetPx());
          } else if (!enabled) {
            applySubtitleOffset(0);
          }

          renderSettingsPopoverAuto();
          return;
        }

        const activeOptionId = String(state.activeSubtitleOptionId || '').trim().toLowerCase();
        syncManagedAssDebugDataset();
        const shouldRecoverAss =
          !ASS_RENDERER_FORCE_FALLBACK
          && !state.assCspBlocked
          && !state.assRendererDisabled
          && activeOptionId.startsWith('ass:')
          && !!state.assSubtitleUrl
          && !state.assRenderer
          && !getAssFallbackTextTrack()
          && !state.assRendererFailed
          && !state.assInitRetryPending;
        if (shouldRecoverAss) {
          state.assInitRetryPending = true;
          const recoverUrl = state.assSubtitleUrl;
          const recoverMeta = state.assSubtitleMeta || null;
          setTimeout(() => {
            state.assInitRetryPending = false;
            if (!recoverUrl) return;
            if (String(state.activeSubtitleOptionId || '').trim().toLowerCase() === 'off') return;
            if (state.assRenderer || getAssFallbackTextTrack()) return;
            initAssRenderer(recoverUrl, recoverMeta);
          }, 0);
        }

        if (!state.assRendererDisabled && !state.assRenderer && !getAssFallbackTextTrack()) {
          tryAutoAttachAssForCurrentHlsTrack('caption_state');
        }

        const forcedOff = enforceSubtitlesOffState();
        enforceExcludedHlsSubtitleSelection();
        const hasAssSubs = !!(state.assSubtitleUrl && state.assRenderer);
        const hasAssActive = hasAssSubs && !!state.assSubtitleEnabled;
        const assFallbackTrack = getAssFallbackTextTrack();
        const hasAssFallbackSubs = !!assFallbackTrack;
        const assFallbackOptionId = String(state.assFallbackOptionId || '').trim().toLowerCase();
        const shouldForceFallbackForActiveOption =
          !!(hasAssFallbackSubs && activeOptionId && activeOptionId !== 'off' && assFallbackOptionId === activeOptionId);
        if (shouldForceFallbackForActiveOption) {
          try {
            assFallbackTrack.mode = 'showing';
          } catch (_) {}
          getSubtitleTracks().forEach((track) => {
            if (track !== assFallbackTrack) {
              try { track.mode = 'disabled'; } catch (_) {}
            }
          });
        } else if (hasAssFallbackSubs) {
          try {
            assFallbackTrack.mode = 'disabled';
          } catch (_) {}
        }
        const hasAssFallbackActive = hasAssFallbackSubs && assFallbackTrack.mode === 'showing';
        const hasHlsSubs = !!(
          state.hls &&
          Array.isArray(state.hls.subtitleTracks) &&
          state.hls.subtitleTracks.some((track, index) => !isHlsSubtitleTrackExcluded(track, index))
        );
        const hasManifestFallbackSubs = !!(
          USE_CANONICAL_SUBTITLE_CONTROLLER &&
          Array.isArray(state.hlsManifestSubtitleTracks) &&
          state.hlsManifestSubtitleTracks.length > 0
        );
        const subtitleTracks = getSubtitleTracks();
        const hasNativeSubs = subtitleTracks.length > 0;
        const hasCanonicalCatalogSubs = !!(
          USE_CANONICAL_SUBTITLE_CONTROLLER &&
          getCanonicalSubtitleTracks().some((track) =>
            !!(
              track &&
              (
                track.assUrl ||
                track.textUrl ||
                (Number.isInteger(Number(track.hlsIndex)) && Number(track.hlsIndex) >= 0) ||
                (Number.isInteger(Number(track.nativeIndex)) && Number(track.nativeIndex) >= 0)
              )
            )
          )
        );
        const shouldKeepAssCueStyleForNative =
          !!assFallbackCueStyleProfile &&
          activeOptionId !== 'off' &&
          (hasHlsSubs || hasManifestFallbackSubs || hasNativeSubs || hasAssActive || hasAssFallbackActive);
        setAssFallbackCueStyleActive(
          !!assFallbackCueStyleProfile &&
          (hasAssFallbackActive || shouldKeepAssCueStyleForNative)
        );
        setNativeVttCueStyleActive(false);
        bindSubtitleTrackOffsetSync();

        if (hasAssActive || hasAssFallbackActive) {
          disableHlsSubtitleTrack();
        }

        if (!hasAssSubs && !hasAssFallbackSubs && !hasHlsSubs && !hasManifestFallbackSubs && !hasNativeSubs && !hasCanonicalCatalogSubs) {
          captionsBtn.disabled = true;
          captionsBtn.dataset.caption = 'off';
          setNativeVttCueStyleActive(false);
          renderSettingsPopoverAuto();
          return;
        }

        captionsBtn.disabled = false;

        let enabled = false;
        if (!forcedOff) {
          if (hasAssActive) {
            enabled = true;
          } else if (hasAssFallbackActive) {
            enabled = subtitleTracks.some((track) => track.mode === 'showing');
          } else if (hasHlsSubs) {
            enabled = Number(state.hls.subtitleTrack) >= 0;
          } else {
            enabled = subtitleTracks.some((track) => track.mode === 'showing');
          }
        }
        const shouldShowHlsDisplay = !hasAssActive && !hasAssFallbackActive && enabled;
        setHlsSubtitleDisplay(shouldShowHlsDisplay);
        captionsBtn.dataset.caption = enabled ? 'on' : 'off';
        if (enabled && state.subtitleLiftActive) {
          applySubtitleOffset(getSubtitleLiftOffsetPx());
        } else if (!enabled) {
          applySubtitleOffset(0);
        }
        renderSettingsPopoverAuto();
      };

      const toggleCaptions = () => {
        if (captionsBtn.disabled) return;
        if (USE_CANONICAL_SUBTITLE_CONTROLLER) {
          const activeId = String(state.activeSubtitleOptionId || '').trim().toLowerCase();
          if (activeId && activeId !== 'off') {
            applySubtitleSelection({ id: 'off', type: 'off', label: 'Nenhum', prefLang: 'off' }).catch(() => null);
            return;
          }
          const preferredTrack = getDefaultCanonicalSubtitleTrack();
          if (!preferredTrack) {
            applyCaptionState();
            return;
          }
          applySubtitleSelection({
            id: preferredTrack.id,
            type: 'track',
            label: preferredTrack.label,
            prefLang: preferredTrack.prefLang,
            track: preferredTrack
          }).catch(() => null);
          return;
        }

        nextSubtitleSelectionEpoch();
        state.pendingHlsSubtitleTargetIndex = null;
        clearHlsSubtitleSyncTimers();

        if (state.assSubtitleUrl && state.assRenderer) {
          const willEnable = !state.assSubtitleEnabled;
          setAssSubtitleEnabled(willEnable);
          state.activeSubtitleOptionId = willEnable ? (state.activeSubtitleOptionId || 'ass:original') : 'off';
          state.userPrefs.subtitleLang = willEnable ? (state.userPrefs.subtitleLang || null) : 'off';
          applyCaptionState();
          renderSettingsPopoverAuto();
          return;
        }

        if (state.assFallbackTrackEl) {
          const hasHlsTracks = !!(state.hls && Array.isArray(state.hls.subtitleTracks) && state.hls.subtitleTracks.length > 0);
          const tracks = getSubtitleTracks();
          const nativeEnabled = tracks.some((track) => track.mode === 'showing');
          if (hasHlsTracks) {
            const hlsCurrent = Number(state.hls.subtitleTrack);
            if (hlsCurrent >= 0 || nativeEnabled) {
              disableHlsSubtitleTrack();
              tracks.forEach((track) => {
                track.mode = 'disabled';
              });
              state.activeSubtitleOptionId = 'off';
              state.manualHlsSubtitleIndex = null;
              state.userPrefs.subtitleLang = 'off';
            } else {
              const firstIndex = getFirstAvailableHlsSubtitleIndex();
              if (firstIndex >= 0) {
                state.hls.subtitleTrack = firstIndex;
                state.manualHlsSubtitleIndex = firstIndex;
                state.activeSubtitleOptionId = null;
                state.userPrefs.subtitleLang = null;
              }
            }
          } else {
            if (nativeEnabled) {
              tracks.forEach((track) => {
                track.mode = 'disabled';
              });
              state.activeSubtitleOptionId = 'off';
              state.userPrefs.subtitleLang = 'off';
            } else {
              tracks.forEach((track, index) => {
                track.mode = index === 0 ? 'showing' : 'disabled';
              });
              state.activeSubtitleOptionId = null;
              state.userPrefs.subtitleLang = null;
            }
          }
          applyCaptionState();
          renderSettingsPopoverAuto();
          return;
        }

        if (state.hls && Array.isArray(state.hls.subtitleTracks) && state.hls.subtitleTracks.length > 0) {
          const current = Number(state.hls.subtitleTrack);
          if (current >= 0) {
            state.hls.subtitleTrack = -1;
            state.activeSubtitleOptionId = 'off';
            state.manualHlsSubtitleIndex = null;
            state.userPrefs.subtitleLang = 'off';
          } else {
            const firstIndex = getFirstAvailableHlsSubtitleIndex();
            if (firstIndex >= 0) {
              state.hls.subtitleTrack = firstIndex;
              state.manualHlsSubtitleIndex = firstIndex;
              state.activeSubtitleOptionId = null;
              state.userPrefs.subtitleLang = null;
            }
          }
          applyCaptionState();
          return;
        }

        const tracks = getSubtitleTracks();
        if (!tracks.length) {
          applyCaptionState();
          return;
        }

        const currentlyEnabled = tracks.some((track) => track.mode === 'showing');
        if (currentlyEnabled) {
          tracks.forEach((track) => {
            track.mode = 'disabled';
          });
          state.activeSubtitleOptionId = 'off';
          state.userPrefs.subtitleLang = 'off';
        } else {
          tracks.forEach((track, index) => {
            track.mode = index === 0 ? 'showing' : 'disabled';
          });
          state.activeSubtitleOptionId = null;
          state.userPrefs.subtitleLang = null;
        }

        applyCaptionState();
      };

      const updateVolumeUi = () => {
        const value = video.muted ? 0 : clamp(video.volume, 0, 1);
        const percent = value * 100;
        volumeSlider.style.setProperty('--slider-fill', `${percent}%`);
        volumeSliderFill.style.width = `${percent}%`;
        volumeSlider.setAttribute('aria-valuenow', `${Math.round(percent)}`);
        applyMuteState();
      };

      const setVolumeFromClientX = (clientX) => {
        const rect = volumeSlider.getBoundingClientRect();
        if (!rect.width) return;
        const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
        video.volume = ratio;
        video.muted = ratio <= 0;
        updateVolumeUi();
      };

      const updateTimeUi = () => {
        const current = Number(video.currentTime || 0);
        const duration = Number(video.duration || state.duration || 0);

        state.currentTime = current;
        state.duration = Number.isFinite(duration) ? duration : 0;

        currentTimeText.textContent = formatTime(current);
        durationText.textContent = formatTime(duration);

        const ratio = duration > 0 ? clamp(current / duration, 0, 1) : 0;
        const percent = ratio * 100;
        timeSlider.style.setProperty('--slider-fill', `${percent}%`);
        timeSliderFill.style.width = `${percent}%`;

        let bufferedRatio = ratio;
        try {
          if (video.buffered && video.buffered.length > 0 && duration > 0) {
            const end = video.buffered.end(video.buffered.length - 1);
            bufferedRatio = clamp(end / duration, 0, 1);
          }
        } catch (_) {}

        const bufferedPercent = bufferedRatio * 100;
        timeSlider.style.setProperty('--slider-progress', `${bufferedPercent}%`);
        timeSliderProgress.style.width = `${bufferedPercent}%`;

        timeSlider.setAttribute('aria-valuenow', `${Math.round(percent)}`);
        timeSlider.setAttribute('aria-valuetext', formatTime(current));
      };

      const seekToRatio = (ratio) => {
        const duration = Number(video.duration || state.duration || 0);
        if (!duration || !Number.isFinite(duration)) return;
        video.currentTime = clamp(ratio, 0, 1) * duration;
      };

      const toAbsoluteUrl = (value = '') => {
        const raw = String(value || '').trim();
        if (!raw) return '';
        try {
          return new URL(raw, window.location.origin).toString();
        } catch {
          return '';
        }
      };

      const parseVttTimestamp = (value = '') => {
        const raw = String(value || '').trim();
        if (!raw) return 0;
        const parts = raw.split(':').map((part) => part.trim());
        if (parts.length < 2) return 0;
        const secPart = parts.pop() || '0';
        const minPart = parts.pop() || '0';
        const hourPart = parts.pop() || '0';
        const secSplit = secPart.split('.');
        const sec = Number(secSplit[0] || 0);
        const ms = Number(secSplit[1] || 0);
        const min = Number(minPart || 0);
        const hr = Number(hourPart || 0);
        return hr * 3600 + min * 60 + sec + (ms / 1000);
      };

      const parseVttCues = (content = '') => {
        const lines = String(content || '').split(/\r?\n/);
        const cues = [];
        for (let i = 0; i < lines.length; i += 1) {
          const line = lines[i].trim();
          if (!line || !line.includes('-->')) continue;

          const [startRaw, endRaw] = line.split('-->').map((part) => part.trim());
          const start = parseVttTimestamp(startRaw);
          const end = parseVttTimestamp(endRaw);
          const nextLine = String(lines[i + 1] || '').trim();
          if (!nextLine) continue;

          const imageUrl = toAbsoluteUrl(nextLine);
          if (!imageUrl) continue;
          cues.push({ start, end, imageUrl });
        }
        return cues;
      };

      const findThumbnailCueIndex = (time) => {
        if (!state.thumbnailCues.length) return null;
        const target = Math.max(0, Number(time) || 0);

        let low = 0;
        let high = state.thumbnailCues.length - 1;
        let bestIndex = null;

        while (low <= high) {
          const mid = Math.floor((low + high) / 2);
          const cue = state.thumbnailCues[mid];
          if (target >= cue.start && target <= cue.end) {
            return mid;
          }
          if (target < cue.start) {
            high = mid - 1;
          } else {
            bestIndex = mid;
            low = mid + 1;
          }
        }

        return bestIndex ?? 0;
      };

      const primeThumbnailCues = (centerIndex = 0, radius = 2) => {
        if (!state.thumbnailCues.length) return;
        const low = Math.max(0, Number(centerIndex) - Math.max(0, Number(radius) || 0));
        const high = Math.min(state.thumbnailCues.length - 1, Number(centerIndex) + Math.max(0, Number(radius) || 0));
        for (let index = low; index <= high; index += 1) {
          const cue = state.thumbnailCues[index];
          if (!cue?.imageUrl || state.thumbnailPrimeCache.has(cue.imageUrl)) continue;
          state.thumbnailPrimeCache.add(cue.imageUrl);
          const img = new Image();
          img.decoding = 'async';
          img.src = cue.imageUrl;
        }
      };

      const updateSliderPreview = (clientX) => {
        const rect = timeSlider.getBoundingClientRect();
        if (!rect.width) return;
        const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
        const duration = Number(video.duration || state.duration || 0);
        const previewTime = duration > 0 ? duration * ratio : 0;

        const previewX = clamp(clientX - rect.left, 0, rect.width);
        timeSliderPreview.style.left = `${previewX}px`;
        timeSliderPreviewValue.textContent = formatTime(previewTime);

        const cueIndex = findThumbnailCueIndex(previewTime);
        const cue = Number.isInteger(cueIndex) ? state.thumbnailCues[cueIndex] || null : null;
        if (cue && cue.imageUrl) {
          if (timeSliderPreviewImage.src !== cue.imageUrl) {
            timeSliderPreviewImage.src = cue.imageUrl;
          }
          primeThumbnailCues(cueIndex, 3);
        }
      };

      const showSliderPreview = () => {
        timeSliderPreview.setAttribute('data-visible', 'true');
      };

      const hideSliderPreview = () => {
        timeSliderPreview.removeAttribute('data-visible');
      };

      const loadThumbnailVtt = async (videoId, contextToken) => {
        state.thumbnailCues = [];
        state.thumbnailPrimeCache = new Set();
        if (!videoId || !contextToken) return;

        const seq = ++state.thumbnailSeq;
        const params = new URLSearchParams();
        params.set('ctx', String(contextToken));
        params.set('w', '240');
        const vttUrl = `/api/videoapi/thumbnails/${encodeURIComponent(videoId)}.vtt?${params.toString()}`;

        const headers = {
          [state.streamProviderHeader || config.streamProviderHeader]: state.streamProviderValue || config.streamProviderValue
        };

        try {
          const response = await fetch(vttUrl, {
            method: 'GET',
            credentials: 'include',
            headers
          });
          if (!response.ok) return;
          const body = await response.text();
          if (seq !== state.thumbnailSeq) return;
          state.thumbnailCues = parseVttCues(body);
          primeThumbnailCues(0, 24);
        } catch (_) {}
      };

      const buildProgressPayload = (time, complete) => {
        if (!state.animeId || !state.episodeId) return null;
        const roundedTime = Math.max(0, Math.round(Number(time) || 0));
        if (roundedTime <= 0 && !complete) return null;

        const durationTarget = Math.max(Math.round(state.duration) || 0, roundedTime);
        return {
          roundedTime,
          payload: {
            animeId: state.animeId,
            episodioId: state.episodeId,
            temporada: state.temporada || 1,
            tempoAssistido: roundedTime,
            duracaoTotal: durationTarget,
            completo: !!complete
          }
        };
      };

      const postProgress = async ({ keepalive = false, force = false, complete = false } = {}) => {
        if (state.externalEmbedMode) return;
        const current = Number(video.currentTime || state.currentTime || 0);
        const duration = Number(video.duration || state.duration || 0);
        if (duration > state.duration) state.duration = duration;

        if (!force && !complete && current - state.lastSavedTime < state.minDelta) return;
        if (state.hasSentComplete && !complete) return;

        const built = buildProgressPayload(current, complete);
        if (!built) return;

        try {
          const req = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(built.payload),
            credentials: 'same-origin'
          };
          if (keepalive) req.keepalive = true;

          const response = await fetch('/api/historico/progresso', req);
          if (!response.ok) return;

          state.lastSavedTime = Math.max(state.lastSavedTime, built.roundedTime);
          if (complete) state.hasSentComplete = true;
        } catch (_) {}
      };

      const hasCompletion = () => {
        if (state.externalEmbedMode) return false;
        const played = Math.max(0, Number(video.currentTime || state.currentTime || 0));
        const total = Math.max(0, Number(video.duration || state.duration || 0));
        if (total <= 0) return played >= 30;
        const ratioThreshold = total * 0.9;
        const nearEndThreshold = Math.max(0, total - 180);
        const required = total >= 600 ? Math.min(ratioThreshold, nearEndThreshold) : ratioThreshold;
        return played >= required;
      };

      const fetchBloggerDirectStream = async (embedUrl) => {
        if (!embedUrl) return null;
        try {
          const url = new URL('/api/blogger/stream', window.location.origin);
          url.searchParams.set('url', embedUrl);
          const response = await fetch(url.toString(), { method: 'GET', credentials: 'same-origin' });
          if (!response.ok) return null;
          const data = await response.json();
          return data?.playUrl ? data : null;
        } catch {
          return null;
        }
      };

      const inferDirectStreamTypeHint = (candidateUrl) => {
        const lower = String(candidateUrl || '').trim().toLowerCase();
        if (!lower) return 'video/mp4';
        if (lower.includes('.m3u8')) return 'application/x-mpegURL';
        if (lower.includes('.mpd')) return 'application/dash+xml';
        return 'video/mp4';
      };

      const resolveBloggerIframeUrl = (candidateUrl) => {
        if (!candidateUrl) return null;
        try {
          const parsed = new URL(candidateUrl, window.location.origin);
          const host = String(parsed.hostname || '').toLowerCase();
          if (
            host === 'www.blogger.com' ||
            host === 'blogger.com' ||
            host.endsWith('.blogger.com') ||
            host === 'blogspot.com' ||
            host.endsWith('.blogspot.com')
          ) {
            return parsed.toString();
          }
          return null;
        } catch {
          return null;
        }
      };

      const shouldUseAnonymousVideoCors = (candidateUrl, provider = '') => {
        const normalizedProvider = String(provider || '').trim().toLowerCase();
        if (normalizedProvider === 'blogger' && resolveDirectBloggerStreamUrl(candidateUrl)) {
          return false;
        }
        return true;
      };

      const resolveDirectBloggerStreamUrl = (candidateUrl) => {
        if (!candidateUrl) return null;
        try {
          const parsed = new URL(candidateUrl, window.location.origin);
          const host = String(parsed.hostname || '').toLowerCase();
          const pathname = String(parsed.pathname || '').toLowerCase();
          const isGoogleVideo = host.includes('googlevideo.com') && pathname.startsWith('/videoplayback');
          const isGoogleUserContent = host.includes('googleusercontent.com');
          const isBloggerVideo =
            (host === 'www.blogger.com' || host === 'blogger.com' || host.endsWith('.blogger.com')) &&
            pathname === '/video.g';
          if (!isGoogleVideo && !isGoogleUserContent && !isBloggerVideo) {
            return null;
          }
          return parsed.toString();
        } catch {
          return null;
        }
      };

      const resolveBloggerFallbackStream = async (candidateUrl) => {
        const iframeUrl = resolveBloggerIframeUrl(candidateUrl);
        if (iframeUrl) {
          return {
            streamUrl: iframeUrl,
            typeHint: 'text/html',
            iframeUrl
          };
        }

        const directStreamUrl = resolveDirectBloggerStreamUrl(candidateUrl);
        if (directStreamUrl) {
          return {
            streamUrl: directStreamUrl,
            typeHint: inferDirectStreamTypeHint(directStreamUrl)
          };
        }

        const direct = await fetchBloggerDirectStream(candidateUrl);
        if (direct?.playUrl) {
          return {
            streamUrl: direct.playUrl,
            typeHint: inferDirectStreamTypeHint(direct.playUrl)
          };
        }

        return null;
      };

      const refreshExternalEmbedUi = () => {
        const external = !!state.externalEmbedMode;
        if (playerShell) {
          playerShell.dataset.externalEmbed = external ? '1' : '0';
        }
        if (watchPage) {
          watchPage.dataset.externalEmbedOnly = external ? '1' : '0';
        }
        if (mediaEmbedFrame) {
          mediaEmbedFrame.hidden = !external;
        }
        video.hidden = external;
        if (external) {
          captionsBtn.disabled = true;
          captionsBtn.dataset.caption = 'off';
          settingsBtn.disabled = true;
          screenshotBtn.disabled = true;
          pipBtn.disabled = true;
          castBtn.disabled = true;
        } else {
          settingsBtn.disabled = false;
          screenshotBtn.disabled = false;
          applyPipState();
          setupCastAvailability();
        }
        if (clipBtn) {
          clipBtn.hidden = external || !state.clipAllowed;
        }
      };

      const detachExternalEmbed = () => {
        state.externalEmbedMode = false;
        state.externalEmbedUrl = null;
        if (mediaEmbedFrame) {
          mediaEmbedFrame.hidden = true;
          try {
            mediaEmbedFrame.removeAttribute('src');
            mediaEmbedFrame.src = 'about:blank';
          } catch (_) {}
        }
        video.hidden = false;
        refreshExternalEmbedUi();
      };

      const attachExternalEmbed = (embedUrl, expectedGeneration) => {
        if (!mediaEmbedFrame || !embedUrl) return false;
        state.externalEmbedMode = true;
        state.externalEmbedUrl = embedUrl;
        video.hidden = true;
        refreshExternalEmbedUi();
        setBuffering(false);
        hideLoading();
        errorEl.classList.add('hidden');
        try {
          mediaEmbedFrame.removeAttribute('src');
          mediaEmbedFrame.src = 'about:blank';
        } catch (_) {}
        const handleLoad = () => {
          if (expectedGeneration && expectedGeneration !== state.streamBootstrapGeneration) return;
          markStreamStartupSuccess();
          hideLoading();
        };
        mediaEmbedFrame.addEventListener('load', handleLoad, { once: true });
        mediaEmbedFrame.hidden = false;
        requestAnimationFrame(() => {
          if (expectedGeneration && expectedGeneration !== state.streamBootstrapGeneration) return;
          mediaEmbedFrame.src = embedUrl;
        });
        return true;
      };

      const attemptBloggerFallback = async (reason = 'unknown') => {
        if (state.bloggerFallbackAttempted) return false;
        if (String(state.streamProvider || '').toLowerCase() !== 'videoapi') return false;
        const fallbackUrl = String(state.bloggerFallbackUrl || '').trim();
        if (!fallbackUrl) return false;

        state.bloggerFallbackAttempted = true;
        clearStreamStartupTimeout();
        showBootstrapBuffering();

        try {
          const resolved = await resolveBloggerFallbackStream(fallbackUrl);
          if (!resolved?.streamUrl) {
            console.warn('[watch] fallback blogger indisponivel', { reason });
            return false;
          }

          await attachStream({
            streamUrl: resolved.streamUrl,
            typeHint: resolved.typeHint,
            playerData: {
              provider: 'blogger',
              type: resolved.typeHint,
              embed_url: fallbackUrl
            }
          });
          schedulePlaybackRestore(state.currentTime, false);
          return true;
        } catch (error) {
          console.warn('[watch] falha ao aplicar fallback blogger', {
            reason,
            error: error?.message || String(error || '')
          });
          return false;
        }
      };

      const attachStream = async ({ streamUrl, typeHint, playerData }) => {
        destroyHls();
        destroyAssRenderer();
        detachExternalEmbed();
        state.assRendererDisabled = false;
        if (playerShell) playerShell.dataset.assRendererDisabled = '0';
        clearHlsSubtitleSyncTimers();
        state.hlsAssSubtitleCache = new Map();
        state.assFallbackVttCache = new Map();
        state.assRendererTrackFailures = new Map();
        state.pendingHlsSubtitleTargetIndex = null;
        clearSubtitleReconcileTimer();
        setSubtitleRuntimeState(null, 'off', null);
        state.assFallbackOptionId = null;
        nextSubtitleSelectionEpoch();
        state.streamUrl = streamUrl;
        state.streamType = inferMimeType(streamUrl, typeHint || playerData?.type || '');
        state.streamProvider = String(playerData?.provider || '').toLowerCase();
        state.streamProviderHeader = String(playerData?.streamProviderHeader || config.streamProviderHeader).trim() || config.streamProviderHeader;
        state.streamProviderValue = String(playerData?.streamProviderValue || config.streamProviderValue).trim() || config.streamProviderValue;
        state.streamContextHeader = String(playerData?.streamContextHeader || config.streamContextHeader).trim() || config.streamContextHeader;
        state.streamContextToken = String(playerData?.streamContextToken || '').trim() || null;
        state.currentVideoId = playerData?.videoId || playerData?.video_id || ((streamUrl || '').match(/[a-f0-9-]{24,}/i) || [])[0] || null;
        state.streamBootstrapGeneration += 1;
        const streamBootstrapGeneration = state.streamBootstrapGeneration;
        state.streamStartupResolved = false;
        state.hlsFatalNetworkErrors = 0;
        state.hlsFatalMediaErrors = 0;
        clearStreamStartupTimeout();
        showBootstrapBuffering();

        if (state.streamProvider === 'videoapi') {
          state.streamStartupTimeoutId = setTimeout(async () => {
            if (state.streamBootstrapGeneration !== streamBootstrapGeneration || state.streamStartupResolved) return;
            const switched = await attemptBloggerFallback('startup-timeout');
            if (switched) return;
            showError('Falha ao iniciar vídeo.');
          }, 12000);
        }

        const externalEmbedUrl =
          state.streamProvider === 'blogger' && playerData?.externalEmbed
            ? String(playerData.externalEmbedUrl || playerData.embed_url || '').trim()
            : '';
        const bloggerIframeUrl =
          state.streamProvider === 'blogger'
            ? (
                externalEmbedUrl
                || resolveBloggerIframeUrl(playerData?.externalEmbedUrl || '')
                || resolveBloggerIframeUrl(playerData?.embed_url || '')
                || resolveBloggerIframeUrl(streamUrl || '')
              )
            : null;
        if (bloggerIframeUrl) {
          try {
            video.pause();
          } catch (_) {}
          try {
            video.removeAttribute('src');
            video.load();
          } catch (_) {}
          attachExternalEmbed(bloggerIframeUrl, streamBootstrapGeneration);
          state.streamType = 'text/html';
          state.currentVideoId = null;
          state.thumbnailCues = [];
          state.thumbnailPrimeCache = new Set();
          timeSliderPreviewImage.removeAttribute('src');
          return;
        }

        if (shouldUseAnonymousVideoCors(streamUrl, state.streamProvider)) {
          video.crossOrigin = 'anonymous';
        } else {
          video.removeAttribute('crossorigin');
          try {
            video.crossOrigin = null;
          } catch (_) {}
        }
        const shouldAutoplayOnLoad = shouldAutoPlayCurrentMedia();
        state.forcePlaybackOnLoad = false;

        if (state.streamType === 'application/x-mpegURL' && window.Hls && window.Hls.isSupported()) {
          const hls = new window.Hls({
            enableWorker: true,
            lowLatencyMode: true,
            backBufferLength: 90,
            maxBufferLength: 45,
            maxMaxBufferLength: 90,
            manifestLoadingMaxRetry: 4,
            manifestLoadingRetryDelay: 500,
            manifestLoadingMaxRetryTimeout: 6000,
            fragLoadingMaxRetry: 4,
            fragLoadingRetryDelay: 500,
            fragLoadingMaxRetryTimeout: 8000,
            levelLoadingMaxRetry: 4,
            levelLoadingRetryDelay: 500,
            levelLoadingMaxRetryTimeout: 6000,
            xhrSetup: (xhr) => {
              xhr.withCredentials = true;
              try {
                xhr.setRequestHeader(state.streamProviderHeader, state.streamProviderValue);
                if (state.streamContextToken) {
                  xhr.setRequestHeader(state.streamContextHeader, state.streamContextToken);
                }
              } catch (_) {}
            }
          });

          state.hls = hls;
          state.qualityPreference = 'auto';
          hls.attachMedia(video);
          hls.on(window.Hls.Events.MEDIA_ATTACHED, () => {
            hls.loadSource(streamUrl);
          });

          hls.on(window.Hls.Events.MANIFEST_PARSED, async () => {
            if (USE_CANONICAL_SUBTITLE_CONTROLLER) {
              await loadHlsManifestSubtitleFallbackTracks(streamUrl).catch(() => []);
              syncSubtitleCatalogFromHlsTracks();
              syncSubtitleCatalogFromNativeTracks();
              if (hasCodexCanonicalSubtitleTracks()) {
                disableHlsSubtitleTrack();
                setHlsSubtitleDisplay(false);
              }
              Promise.resolve()
                .then(() => ensureCanonicalSubtitleSelectionInitialized('manifest'))
                .then(() => {
                  scheduleCanonicalSubtitleReconcile('manifest', 120);
                  applyCaptionState();
                  renderSettingsPopoverAuto();
                })
                .catch(() => null);
              if (shouldAutoplayOnLoad) {
                try {
                  await video.play();
                } catch {
                  video.muted = true;
                  try { await video.play(); } catch (_) {}
                }
              }
              return;
            }

            enforceExcludedHlsSubtitleSelection();
            if (enforceSubtitlesOffState()) {
              applyCaptionState();
              renderSettingsPopover();
              if (shouldAutoplayOnLoad) {
                try {
                  await video.play();
                } catch {
                  video.muted = true;
                  try { await video.play(); } catch (_) {}
                }
              }
              return;
            }
            if (isAssBlockingHlsSubtitles()) {
              disableHlsSubtitleTrack();
              setHlsSubtitleDisplay(false);
              applyCaptionState();
              renderSettingsPopover();
              if (shouldAutoplayOnLoad) {
                try {
                  await video.play();
                } catch {
                  video.muted = true;
                  try { await video.play(); } catch (_) {}
                }
              }
              return;
            }
            enforcePreferredHlsSubtitleTrackByPrefs();
            syncNativeTrackWithHlsSubtitleIndex();
            tryAutoAttachAssForCurrentHlsTrack('manifest');
            applyCaptionState();
            renderSettingsPopover();
            if (shouldAutoplayOnLoad) {
              try {
                await video.play();
              } catch {
                video.muted = true;
                try { await video.play(); } catch (_) {}
              }
            }
          });

          const bindHlsEvent = (eventName, handler) => {
            const key = window.Hls?.Events?.[eventName];
            if (key) hls.on(key, handler);
          };
          bindHlsEvent('SUBTITLE_TRACKS_UPDATED', () => {
            if (USE_CANONICAL_SUBTITLE_CONTROLLER) {
              syncSubtitleCatalogFromHlsTracks();
              syncSubtitleCatalogFromNativeTracks();
              if (hasCodexCanonicalSubtitleTracks()) {
                disableHlsSubtitleTrack();
                setHlsSubtitleDisplay(false);
              }
              scheduleCanonicalSubtitleReconcile('tracks_updated', 80);
              applyCaptionState();
              renderSettingsPopoverAuto();
              return;
            }

            enforceExcludedHlsSubtitleSelection();
            if (enforceSubtitlesOffState()) {
              applyCaptionState();
              renderSettingsPopoverAuto();
              return;
            }
            if (isAssBlockingHlsSubtitles()) {
              disableHlsSubtitleTrack();
              setHlsSubtitleDisplay(false);
              applyCaptionState();
              renderSettingsPopoverAuto();
              return;
            }
            enforcePreferredHlsSubtitleTrackByPrefs();
            syncNativeTrackWithHlsSubtitleIndex();
            tryAutoAttachAssForCurrentHlsTrack('tracks_updated');
            applyCaptionState();
            renderSettingsPopoverAuto();
          });
          bindHlsEvent('SUBTITLE_TRACK_SWITCH', (_event, payload) => {
            if (USE_CANONICAL_SUBTITLE_CONTROLLER) {
              syncSubtitleCatalogFromHlsTracks();
              if (hasCodexCanonicalSubtitleTracks()) {
                disableHlsSubtitleTrack();
                setHlsSubtitleDisplay(false);
              }
              scheduleCanonicalSubtitleReconcile(`track_switch:${Number(payload?.id)}`, 40);
              applyCaptionState();
              renderSettingsPopoverAuto();
              return;
            }

            enforceExcludedHlsSubtitleSelection();
            if (enforceSubtitlesOffState()) {
              applyCaptionState();
              renderSettingsPopoverAuto();
              return;
            }
            if (isAssBlockingHlsSubtitles()) {
              disableHlsSubtitleTrack();
              setHlsSubtitleDisplay(false);
              applyCaptionState();
              renderSettingsPopoverAuto();
              return;
            }
            const switchedIndex = Number(payload?.id);
            const pendingTarget = Number(state.pendingHlsSubtitleTargetIndex);
            const activeOptionId = String(state.activeSubtitleOptionId || '').trim();
            const activeHlsMatch = activeOptionId.toLowerCase().match(/^hls:(\d+)$/);
            const activeHlsIndex = activeHlsMatch?.[1] ? Number(activeHlsMatch[1]) : -1;
            if (
              !Number.isFinite(pendingTarget) &&
              Number.isInteger(activeHlsIndex) &&
              activeHlsIndex >= 0 &&
              Number.isFinite(switchedIndex) &&
              switchedIndex >= 0 &&
              switchedIndex !== activeHlsIndex
            ) {
              scheduleHlsSubtitleSync(activeHlsIndex, `hls:${activeHlsIndex}`);
              return;
            }
            const allowPassiveUpdate = !activeOptionId;
            if (
              !Number.isFinite(pendingTarget) &&
              !allowPassiveUpdate &&
              !activeOptionId.startsWith('hls:')
            ) {
              return;
            }
            if (
              Number.isFinite(pendingTarget) &&
              pendingTarget >= 0 &&
              Number.isFinite(switchedIndex) &&
              switchedIndex >= 0 &&
              switchedIndex !== pendingTarget
            ) {
              return;
            }
            if (Number.isFinite(switchedIndex) && switchedIndex >= 0) {
              state.activeSubtitleOptionId = `hls:${switchedIndex}`;
              if (Number.isFinite(pendingTarget) && pendingTarget === switchedIndex) {
                state.pendingHlsSubtitleTargetIndex = null;
              }
              scheduleHlsSubtitleSync(switchedIndex, `hls:${switchedIndex}`);
            } else {
              scheduleHlsSubtitleSync();
            }
            tryAutoAttachAssForCurrentHlsTrack('track_switch');
            applyCaptionState();
            renderSettingsPopoverAuto();
          });
          bindHlsEvent('SUBTITLE_TRACK_SWITCHED', (_event, payload) => {
            if (USE_CANONICAL_SUBTITLE_CONTROLLER) {
              syncSubtitleCatalogFromHlsTracks();
              syncSubtitleCatalogFromNativeTracks();
              if (hasCodexCanonicalSubtitleTracks()) {
                disableHlsSubtitleTrack();
                setHlsSubtitleDisplay(false);
              }
              scheduleCanonicalSubtitleReconcile(`track_switched:${Number(payload?.id)}`, 20);
              applyCaptionState();
              renderSettingsPopoverAuto();
              return;
            }

            if (enforceSubtitlesOffState()) {
              applyCaptionState();
              renderSettingsPopoverAuto();
              return;
            }
            if (isAssBlockingHlsSubtitles()) {
              disableHlsSubtitleTrack();
              setHlsSubtitleDisplay(false);
              applyCaptionState();
              renderSettingsPopoverAuto();
              return;
            }
            const switchedIndex = Number(payload?.id);
            const pendingTarget = Number(state.pendingHlsSubtitleTargetIndex);
            const activeOptionId = String(state.activeSubtitleOptionId || '').trim();
            const activeHlsMatch = activeOptionId.toLowerCase().match(/^hls:(\d+)$/);
            const activeHlsIndex = activeHlsMatch?.[1] ? Number(activeHlsMatch[1]) : -1;
            if (
              !Number.isFinite(pendingTarget) &&
              Number.isInteger(activeHlsIndex) &&
              activeHlsIndex >= 0 &&
              Number.isFinite(switchedIndex) &&
              switchedIndex >= 0 &&
              switchedIndex !== activeHlsIndex
            ) {
              scheduleHlsSubtitleSync(activeHlsIndex, `hls:${activeHlsIndex}`);
              return;
            }
            const allowPassiveUpdate = !activeOptionId;
            if (
              !Number.isFinite(pendingTarget) &&
              !allowPassiveUpdate &&
              !activeOptionId.startsWith('hls:')
            ) {
              return;
            }
            if (
              Number.isFinite(pendingTarget) &&
              pendingTarget >= 0 &&
              Number.isFinite(switchedIndex) &&
              switchedIndex >= 0 &&
              switchedIndex !== pendingTarget
            ) {
              return;
            }
            if (Number.isFinite(switchedIndex) && switchedIndex >= 0) {
              state.activeSubtitleOptionId = `hls:${switchedIndex}`;
              if (Number.isFinite(pendingTarget) && pendingTarget === switchedIndex) {
                state.pendingHlsSubtitleTargetIndex = null;
              }
              scheduleHlsSubtitleSync(switchedIndex, `hls:${switchedIndex}`);
            } else {
              scheduleHlsSubtitleSync();
            }
            tryAutoAttachAssForCurrentHlsTrack('track_switched');
            applyCaptionState();
            renderSettingsPopoverAuto();
          });
          bindHlsEvent('AUDIO_TRACKS_UPDATED', () => {
            renderSettingsPopoverAuto();
          });
          bindHlsEvent('AUDIO_TRACK_SWITCHED', () => {
            renderSettingsPopoverAuto();
          });
          bindHlsEvent('LEVEL_SWITCHED', () => {
            renderSettingsPopoverAuto();
          });
          bindHlsEvent('LEVEL_SWITCHING', () => {
            renderSettingsPopoverAuto();
          });

          hls.on(window.Hls.Events.ERROR, async (_event, data) => {
            if (!data || !data.fatal) return;
            if (data.type === window.Hls.ErrorTypes.NETWORK_ERROR) {
              state.hlsFatalNetworkErrors += 1;
              if (state.hlsFatalNetworkErrors <= 1) {
                try { hls.startLoad(); } catch (_) {}
                return;
              }
              const switched = await attemptBloggerFallback(`hls-network:${data.details || 'unknown'}`);
              if (switched) return;
              showError('Falha ao carregar vídeo do Codex.');
              return;
            }
            if (data.type === window.Hls.ErrorTypes.MEDIA_ERROR) {
              state.hlsFatalMediaErrors += 1;
              if (state.hlsFatalMediaErrors <= 1) {
                try { hls.recoverMediaError(); } catch (_) {}
                return;
              }
              const switched = await attemptBloggerFallback(`hls-media:${data.details || 'unknown'}`);
              if (switched) return;
              showError('Falha ao carregar vídeo do Codex.');
              return;
            }
            const switched = await attemptBloggerFallback(`hls-fatal:${data.type || 'unknown'}`);
            if (switched) return;
            showError('Falha ao reproduzir vídeo (HLS).');
          });
        } else {
          video.src = streamUrl;
          if (USE_CANONICAL_SUBTITLE_CONTROLLER) {
            loadHlsManifestSubtitleFallbackTracks(streamUrl)
              .then(() => {
                syncSubtitleCatalogFromHlsTracks();
                syncSubtitleCatalogFromNativeTracks();
                scheduleCanonicalSubtitleReconcile('native_manifest', 40);
                applyCaptionState();
                renderSettingsPopoverAuto();
              })
              .catch(() => null);
          }
          renderSettingsPopoverAuto();
          if (shouldAutoplayOnLoad) {
            try {
              await video.play();
            } catch {
              video.muted = true;
              try { await video.play(); } catch (_) {}
            }
          }
        }

        if (state.streamProvider === 'videoapi' && state.currentVideoId && state.streamContextToken) {
          loadThumbnailVtt(state.currentVideoId, state.streamContextToken);
        } else {
          state.thumbnailCues = [];
          state.thumbnailPrimeCache = new Set();
          timeSliderPreviewImage.removeAttribute('src');
        }
      };

      const updateNextButton = () => {
        nextBtn.disabled = !getEpisodeNavigationTarget('next')?.watch_path;
      };

      const navigateToEpisode = (direction, options = {}) => {
        const targetEpisode = getEpisodeNavigationTarget(direction);
        if (!targetEpisode?.watch_path) return;
        const navUrl = buildNavigationUrlWithOptions(targetEpisode.watch_path, options);
        window.location.href = navUrl || targetEpisode.watch_path;
      };

      const setEpisodesPopoverOpen = (open) => {
        state.episodesPopoverOpen = !!open;
        episodesPopover.classList.toggle('open', !!open);
        episodesPopover.setAttribute('aria-hidden', open ? 'false' : 'true');
        if (open) {
          setControlsVisible(true);
          clearSubtitleLiftTimer();
        } else if (!shouldKeepSubtitleLift()) {
          scheduleSubtitleLiftDown(380);
        }
      };

      const positionEpisodesPopover = () => {
        const rect = episodesBtn.getBoundingClientRect();
        const width = Math.min(420, Math.max(260, window.innerWidth - 24));
        const half = width / 2;
        const minLeft = 12 + half;
        const maxLeft = window.innerWidth - 12 - half;
        const left = clamp(rect.left + rect.width / 2, minLeft, maxLeft);
        const top = Math.max(14, rect.top - 8);
        episodesPopover.style.width = `${width}px`;
        episodesPopover.style.left = `${left}px`;
        episodesPopover.style.top = `${top}px`;
      };

      const renderEpisodesPopover = () => {
        const total = state.allEpisodes.length;
        const currentKey = normalizeEpisodeToken(state.currentEpisodeToken);
        const currentIndex = state.allEpisodes.findIndex((ep) => {
          const tokenValue = ep?.token || ep?.watch_path || '';
          return normalizeEpisodeToken(tokenValue) === currentKey;
        });

        episodesPopoverSeason.textContent = `Temporada ${state.currentSeasonNumber || 1}`;
        episodesPopoverCount.textContent = `${total} episódios`;

        episodesPopoverList.innerHTML = '';

        if (!total) {
          const empty = document.createElement('div');
          empty.style.cssText = 'font-size:12px;color:rgba(255,255,255,.75);padding:6px 8px;';
          empty.textContent = 'Lista de episódios indisponível.';
          episodesPopoverList.appendChild(empty);
          return;
        }

        const start = currentIndex >= 0 ? Math.max(0, currentIndex - 3) : 0;
        const end = Math.min(total, start + 24);

        for (let i = start; i < end; i += 1) {
          const episode = state.allEpisodes[i];
          let targetPath = episode.watch_path || null;
          const tokenValue = episode.token || null;
          if (!targetPath && tokenValue) {
            const tokenText = String(tokenValue);
            if (/^episode-[0-9]+(?:\.[0-9]+)?-/i.test(tokenText)) {
              targetPath = `/watch/${encodeURIComponent(state.currentSeasonToken)}/${encodeURIComponent(tokenText)}`;
            } else if (episode.numero) {
              targetPath = `/watch/${encodeURIComponent(state.currentSeasonToken)}/episode-${episode.numero}-${encodeURIComponent(tokenText)}`;
            } else {
              targetPath = `/watch/${encodeURIComponent(state.currentSeasonToken)}/${encodeURIComponent(tokenText)}`;
            }
          }

          if (!targetPath) continue;

          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'episodes-popover-item';
          if (i === currentIndex) btn.classList.add('current');
          const title = resolveEpisodeName(episode, i);
          const description = resolveEpisodeDescription(episode);
          const thumb = resolveEpisodeThumb(episode);
          btn.title = title;
          btn.innerHTML = `
            <img class="episodes-popover-thumb" src="${escapeHtml(thumb)}" alt="${escapeHtml(title)}" loading="lazy">
            <span class="episodes-popover-text">
              <span class="episodes-popover-title">${escapeHtml(title)}</span>
              <span class="episodes-popover-desc">${escapeHtml(description)}</span>
            </span>
          `;
          btn.addEventListener('click', () => {
            setEpisodesPopoverOpen(false);
            const navUrl = buildNavigationUrl(targetPath);
            window.location.href = navUrl || targetPath;
          });
          episodesPopoverList.appendChild(btn);
        }
      };

      const toggleEpisodesPopover = () => {
        if (state.episodesPopoverOpen) {
          setEpisodesPopoverOpen(false);
          return;
        }
        renderEpisodesPopover();
        positionEpisodesPopover();
        setEpisodesPopoverOpen(true);
      };

      const openCastSession = async () => {
        if (state.externalEmbedMode) return;
        if (!window.__CAST_READY || !window.cast || !window.chrome || !window.cast.framework) return;
        if (!state.streamUrl) return;

        try {
          const castContext = window.cast.framework.CastContext.getInstance();
          await castContext.requestSession();
          const session = castContext.getCurrentSession();
          if (!session) return;

          const mediaInfo = new window.chrome.cast.media.MediaInfo(state.streamUrl, state.streamType || 'application/x-mpegURL');
          mediaInfo.streamType = window.chrome.cast.media.StreamType.BUFFERED;

          const request = new window.chrome.cast.media.LoadRequest(mediaInfo);
          request.autoplay = true;
          request.currentTime = Number(video.currentTime || 0);

          await session.loadMedia(request);
        } catch (error) {
          console.warn('[Cast] Falha ao iniciar cast:', error?.message || error);
        }
      };

      const captureScreenshot = () => {
        if (state.externalEmbedMode) {
          showError('Captura de tela indisponível no player do Blogger.');
          return;
        }
        if (!video.videoWidth || !video.videoHeight) return;
        try {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            if (!blob) return;
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            const stamp = new Date().toISOString().replace(/[:.]/g, '-');
            a.href = url;
            a.download = `${config.downloadPrefix}-${stamp}.png`;
            a.click();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
          }, 'image/png');
        } catch (error) {
          const isDirectBlogger =
            String(state.streamProvider || '').trim().toLowerCase() === 'blogger' &&
            !!resolveDirectBloggerStreamUrl(state.streamUrl || '');
          showError(
            isDirectBlogger
              ? 'Captura de tela indisponível em stream direto do Blogger.'
              : 'Não foi possível capturar a cena.'
          );
          console.warn('[watch] screenshot blocked', {
            provider: state.streamProvider,
            message: error?.message || String(error || '')
          });
        }
      };

      const CLIP_MIN_DURATION_MS = 250;

      const getClipTotalDurationMs = () => {
        return Math.max(0, Math.round((Number(video.duration || state.duration || 0) || 0) * 1000));
      };

      const getClipMaxAllowedDurationMs = () => {
        const configured = Math.max(CLIP_MIN_DURATION_MS, Math.round(Number(state.clipMaxDurationMs) || (5 * 60 * 1000)));
        const total = getClipTotalDurationMs();
        return total > 0 ? Math.min(configured, total) : configured;
      };

      const formatClipClock = (milliseconds = 0) => {
        const total = Math.max(0, Math.round(Number(milliseconds) || 0));
        const hours = Math.floor(total / 3600000);
        const minutes = Math.floor((total % 3600000) / 60000);
        const seconds = Math.floor((total % 60000) / 1000);
        const millis = total % 1000;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(millis).padStart(3, '0')}`;
      };

      const splitClipMilliseconds = (milliseconds = 0) => {
        const total = Math.max(0, Math.round(Number(milliseconds) || 0));
        return {
          hours: Math.floor(total / 3600000),
          minutes: Math.floor((total % 3600000) / 60000),
          seconds: Math.floor((total % 60000) / 1000),
          millis: total % 1000
        };
      };

      const readClipFieldValue = (input, fallback = 0, max = Number.POSITIVE_INFINITY) => {
        const parsed = Number(input?.value ?? fallback);
        if (!Number.isFinite(parsed)) return fallback;
        return clamp(Math.floor(parsed), 0, max);
      };

      const writeClipFieldGroup = (group, milliseconds) => {
        const parts = splitClipMilliseconds(milliseconds);
        if (group === 'start') {
          clipStartHours.value = String(parts.hours);
          clipStartMinutes.value = String(parts.minutes);
          clipStartSeconds.value = String(parts.seconds);
          clipStartMillis.value = String(parts.millis);
          return;
        }
        clipEndHours.value = String(parts.hours);
        clipEndMinutes.value = String(parts.minutes);
        clipEndSeconds.value = String(parts.seconds);
        clipEndMillis.value = String(parts.millis);
      };

      const readClipFieldGroup = (group) => {
        const hours = readClipFieldValue(group === 'start' ? clipStartHours : clipEndHours, 0);
        const minutes = readClipFieldValue(group === 'start' ? clipStartMinutes : clipEndMinutes, 0, 59);
        const seconds = readClipFieldValue(group === 'start' ? clipStartSeconds : clipEndSeconds, 0, 59);
        const millis = readClipFieldValue(group === 'start' ? clipStartMillis : clipEndMillis, 0, 999);
        return (((hours * 60 + minutes) * 60) + seconds) * 1000 + millis;
      };

      const normalizeClipSelection = (startCandidate, endCandidate, preferredEdge = 'end') => {
        const totalDurationMs = getClipTotalDurationMs();
        const maxAllowedMs = Math.max(CLIP_MIN_DURATION_MS, getClipMaxAllowedDurationMs());
        let startMs = Math.max(0, Math.round(Number(startCandidate) || 0));
        let endMs = Math.max(0, Math.round(Number(endCandidate) || 0));

        if (totalDurationMs > 0) {
          startMs = clamp(startMs, 0, totalDurationMs);
          endMs = clamp(endMs, 0, totalDurationMs);
        }

        if (endMs - startMs < CLIP_MIN_DURATION_MS) {
          if (preferredEdge === 'start') {
            endMs = startMs + CLIP_MIN_DURATION_MS;
          } else {
            startMs = Math.max(0, endMs - CLIP_MIN_DURATION_MS);
          }
        }

        if (totalDurationMs > 0) {
          if (endMs > totalDurationMs) {
            if (preferredEdge === 'start') {
              startMs = Math.max(0, totalDurationMs - Math.max(CLIP_MIN_DURATION_MS, endMs - startMs));
              endMs = totalDurationMs;
            } else {
              endMs = totalDurationMs;
            }
          }
          startMs = clamp(startMs, 0, totalDurationMs);
          endMs = clamp(endMs, 0, totalDurationMs);
        }

        if (endMs - startMs > maxAllowedMs) {
          if (preferredEdge === 'start') {
            endMs = startMs + maxAllowedMs;
          } else {
            startMs = Math.max(0, endMs - maxAllowedMs);
          }
        }

        if (totalDurationMs > 0) {
          if (endMs > totalDurationMs) {
            endMs = totalDurationMs;
            startMs = Math.max(0, endMs - Math.min(maxAllowedMs, totalDurationMs));
          }
          startMs = clamp(startMs, 0, totalDurationMs);
          endMs = clamp(endMs, Math.min(totalDurationMs, startMs + CLIP_MIN_DURATION_MS), totalDurationMs);
        } else {
          endMs = Math.max(endMs, startMs + CLIP_MIN_DURATION_MS);
        }

        return {
          startMs: Math.max(0, Math.round(startMs)),
          endMs: Math.max(CLIP_MIN_DURATION_MS, Math.round(endMs))
        };
      };

      const setClipModalError = (message = '') => {
        const text = String(message || '').trim();
        if (!clipModalError) return;
        clipModalError.textContent = text;
        clipModalError.hidden = !text;
      };

      const updateClipPreviewUi = (statusOverride = '') => {
        if (!clipPreviewPlayBtn || !clipPreviewStatus) return;
        const isReady = !!state.clipPreviewReady;
        const isPaused = clipPreviewVideo?.paused ?? true;
        clipPreviewPlayBtn.disabled = !isReady;
        clipPreviewPlayBtn.textContent = isPaused ? 'Reproduzir prévia' : 'Pausar prévia';
        if (statusOverride) {
          clipPreviewStatus.textContent = statusOverride;
          return;
        }
        if (!isReady) {
          clipPreviewStatus.textContent = 'Carregando prévia…';
          return;
        }
        clipPreviewStatus.textContent = isPaused ? 'Prévia pausada' : 'Prévia reproduzindo';
      };

      const syncClipRangeFill = () => {
        if (!clipRangeFill) return;
        const total = Math.max(1, getClipTotalDurationMs());
        const leftPercent = clamp((state.clipStartMs / total) * 100, 0, 100);
        const rightPercent = clamp((state.clipEndMs / total) * 100, 0, 100);
        clipRangeFill.style.left = `${leftPercent}%`;
        clipRangeFill.style.width = `${Math.max(0, rightPercent - leftPercent)}%`;
      };

      const syncClipPreviewToSelection = async ({ autoplay = false, forceSeek = false } = {}) => {
        if (!clipPreviewVideo || !state.clipModalOpen || !state.clipPreviewReady) return;
        const startSeconds = state.clipStartMs / 1000;
        const endSeconds = state.clipEndMs / 1000;
        const current = Number(clipPreviewVideo.currentTime || 0);
        if (forceSeek || current < startSeconds - 0.15 || current >= endSeconds - 0.05) {
          try {
            clipPreviewVideo.currentTime = startSeconds;
          } catch (_) {}
        }
        if (autoplay) {
          try {
            await clipPreviewVideo.play();
          } catch (_) {}
        }
        updateClipPreviewUi();
      };

      const maintainClipPreviewLoop = async () => {
        if (!clipPreviewVideo || !state.clipModalOpen || !state.clipPreviewReady) return;
        const startSeconds = state.clipStartMs / 1000;
        const endSeconds = state.clipEndMs / 1000;
        const current = Number(clipPreviewVideo.currentTime || 0);
        if (current < startSeconds - 0.2) {
          try {
            clipPreviewVideo.currentTime = startSeconds;
          } catch (_) {}
          return;
        }
        if (current >= Math.max(startSeconds + 0.05, endSeconds - 0.04)) {
          try {
            clipPreviewVideo.currentTime = startSeconds;
          } catch (_) {}
          if (!clipPreviewVideo.paused) {
            try {
              await clipPreviewVideo.play();
            } catch (_) {}
          }
        }
      };

      const destroyClipPreview = () => {
        if (state.clipPreviewHls) {
          try { state.clipPreviewHls.destroy(); } catch (_) {}
          state.clipPreviewHls = null;
        }
        state.clipPreviewReady = false;
        if (clipPreviewVideo) {
          try { clipPreviewVideo.pause(); } catch (_) {}
          clipPreviewVideo.removeAttribute('src');
          try { clipPreviewVideo.load(); } catch (_) {}
        }
        updateClipPreviewUi('Prévia do clipe');
      };

      const renderClipModalState = ({ syncInputs = true, syncSliders = true, syncPreview = true } = {}) => {
        const total = Math.max(0, getClipTotalDurationMs());
        const maxAllowed = getClipMaxAllowedDurationMs();
        const normalized = normalizeClipSelection(state.clipStartMs, state.clipEndMs, 'end');
        state.clipStartMs = normalized.startMs;
        state.clipEndMs = normalized.endMs;

        if (clipStartLabel) clipStartLabel.textContent = formatClipClock(state.clipStartMs);
        if (clipEndLabel) clipEndLabel.textContent = formatClipClock(state.clipEndMs);
        if (clipDurationLabel) clipDurationLabel.textContent = formatClipClock(state.clipEndMs - state.clipStartMs);
        if (clipStartOutput) clipStartOutput.textContent = formatClipClock(state.clipStartMs);
        if (clipEndOutput) clipEndOutput.textContent = formatClipClock(state.clipEndMs);

        if (syncInputs) {
          writeClipFieldGroup('start', state.clipStartMs);
          writeClipFieldGroup('end', state.clipEndMs);
        }

        if (syncSliders) {
          const sliderMax = String(Math.max(0, total));
          clipStartRange.max = sliderMax;
          clipEndRange.max = sliderMax;
          clipStartRange.value = String(state.clipStartMs);
          clipEndRange.value = String(state.clipEndMs);
        }

        syncClipRangeFill();
        if (clipExportBtn) {
          clipExportBtn.disabled = state.clipExportInFlight || (state.clipEndMs - state.clipStartMs) > maxAllowed;
          clipExportBtn.textContent = state.clipExportInFlight ? 'Exportando…' : 'Exportar .mkv';
        }

        if (syncPreview) {
          syncClipPreviewToSelection({ autoplay: false, forceSeek: false }).catch(() => null);
        }
      };

      const applyClipSelection = (startCandidate, endCandidate, preferredEdge = 'end', renderOptions = {}) => {
        const normalized = normalizeClipSelection(startCandidate, endCandidate, preferredEdge);
        state.clipStartMs = normalized.startMs;
        state.clipEndMs = normalized.endMs;
        renderClipModalState(renderOptions);
      };

      const openClipModal = async () => {
        if (!state.clipAllowed) return;
        const totalDurationMs = getClipTotalDurationMs();
        if (!(totalDurationMs > 0)) {
          setClipModalError('Aguarde o episódio carregar totalmente para clipar.');
          return;
        }

        setClipModalError('');
        state.clipPreviewResumeOnClose = !video.paused;
        try { video.pause(); } catch (_) {}
        await setCommentsPanelOpen(false);
        setEpisodesPopoverOpen(false);
        setSettingsPopoverOpen(false);
        hideSkipPrompt();

        const currentMs = clamp(Math.round((Number(video.currentTime || 0) || 0) * 1000), 0, totalDurationMs);
        const targetWindowMs = Math.min(30000, getClipMaxAllowedDurationMs());
        const initialStart = Math.max(0, currentMs - Math.round(targetWindowMs * 0.25));
        const initialEnd = Math.min(totalDurationMs, initialStart + targetWindowMs);
        const normalized = normalizeClipSelection(initialStart, initialEnd, 'start');
        state.clipStartMs = normalized.startMs;
        state.clipEndMs = normalized.endMs;
        state.clipModalOpen = true;

        clipModalBackdrop.setAttribute('data-open', 'true');
        clipModalBackdrop.setAttribute('aria-hidden', 'false');
        renderClipModalState({ syncInputs: true, syncSliders: true, syncPreview: false });
        updateClipPreviewUi('Carregando prévia…');

        requestAnimationFrame(() => {
          clipModalCloseBtn?.focus();
        });

        destroyClipPreview();
        clipPreviewVideo.muted = true;
        clipPreviewVideo.loop = false;
        clipPreviewVideo.playsInline = true;
        clipPreviewVideo.preload = 'metadata';

        if (state.streamType === 'application/x-mpegURL' && window.Hls && window.Hls.isSupported()) {
          const previewHls = new window.Hls({
            enableWorker: true,
            lowLatencyMode: true,
            backBufferLength: 12,
            maxBufferLength: 20,
            maxMaxBufferLength: 30,
            manifestLoadingMaxRetry: 2,
            manifestLoadingRetryDelay: 350,
            fragLoadingMaxRetry: 2,
            fragLoadingRetryDelay: 350,
            levelLoadingMaxRetry: 2,
            levelLoadingRetryDelay: 350,
            xhrSetup: (xhr) => {
              xhr.withCredentials = true;
              try {
                xhr.setRequestHeader(state.streamProviderHeader, state.streamProviderValue);
                if (state.streamContextToken) {
                  xhr.setRequestHeader(state.streamContextHeader, state.streamContextToken);
                }
              } catch (_) {}
            }
          });
          state.clipPreviewHls = previewHls;
          previewHls.attachMedia(clipPreviewVideo);
          previewHls.on(window.Hls.Events.MEDIA_ATTACHED, () => {
            previewHls.loadSource(state.streamUrl);
          });
          previewHls.on(window.Hls.Events.MANIFEST_PARSED, () => {
            if (!state.clipModalOpen) return;
            state.clipPreviewReady = true;
            renderClipModalState({ syncInputs: false, syncSliders: false, syncPreview: false });
            syncClipPreviewToSelection({ autoplay: true, forceSeek: true }).catch(() => null);
          });
          previewHls.on(window.Hls.Events.ERROR, (_event, data) => {
            if (!state.clipModalOpen) return;
            if (!data?.fatal) return;
            setClipModalError('Não foi possível carregar a prévia do clipe.');
            updateClipPreviewUi('Falha ao carregar prévia');
          });
          return;
        }

        clipPreviewVideo.src = state.streamUrl;
        try {
          clipPreviewVideo.load();
        } catch (_) {}
      };

      const closeClipModal = async ({ restorePlayback = true } = {}) => {
        if (!state.clipModalOpen) return;
        state.clipModalOpen = false;
        state.clipExportInFlight = false;
        clipModalBackdrop.setAttribute('data-open', 'false');
        clipModalBackdrop.setAttribute('aria-hidden', 'true');
        setClipModalError('');
        destroyClipPreview();
        renderClipModalState({ syncInputs: false, syncSliders: false, syncPreview: false });
        if (restorePlayback && state.clipPreviewResumeOnClose) {
          await playVideoSafe();
        }
        updateSkipPrompt();
      };

      const parseDownloadFilename = (headerValue = '') => {
        const raw = String(headerValue || '');
        const utfMatch = raw.match(/filename\*\s*=\s*UTF-8''([^;]+)/i);
        if (utfMatch?.[1]) {
          try {
            return decodeURIComponent(utfMatch[1]);
          } catch {
            return utfMatch[1];
          }
        }
        const plainMatch = raw.match(/filename\s*=\s*\"?([^\";]+)\"?/i);
        return plainMatch?.[1] ? plainMatch[1] : '';
      };

      const downloadClipBlob = (blob, filename = '') => {
        const objectUrl = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = objectUrl;
        anchor.download = filename || `${config.downloadPrefix}-clip-${Date.now()}.mkv`;
        anchor.click();
        setTimeout(() => URL.revokeObjectURL(objectUrl), 2000);
      };

      const exportClipSelection = async () => {
        if (!state.clipAllowed || state.clipExportInFlight) return;
        const normalized = normalizeClipSelection(state.clipStartMs, state.clipEndMs, 'end');
        state.clipStartMs = normalized.startMs;
        state.clipEndMs = normalized.endMs;
        const clipDurationMs = state.clipEndMs - state.clipStartMs;
        if (!(clipDurationMs >= CLIP_MIN_DURATION_MS)) {
          setClipModalError('Selecione um intervalo válido para exportar.');
          renderClipModalState({ syncInputs: true, syncSliders: true, syncPreview: false });
          return;
        }
        if (clipDurationMs > getClipMaxAllowedDurationMs()) {
          setClipModalError('O clipe pode ter no máximo 5 minutos.');
          renderClipModalState({ syncInputs: true, syncSliders: true, syncPreview: false });
          return;
        }

        state.clipExportInFlight = true;
        setClipModalError('');
        renderClipModalState({ syncInputs: false, syncSliders: false, syncPreview: false });

        try {
          const response = await fetch(
            `/api/watch/${encodeURIComponent(state.currentSeasonToken)}/${encodeURIComponent(state.currentEpisodeRouteToken)}/clip`,
            {
              method: 'POST',
              credentials: 'same-origin',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                startMs: state.clipStartMs,
                endMs: state.clipEndMs,
                provider: state.streamProvider || null,
                audio: getNavigationAudioParam() || state.userPrefs.audioLang || null,
                videoId: state.currentVideoId || null
              })
            }
          );

          if (!response.ok) {
            let errorText = 'Não foi possível exportar o clipe.';
            try {
              const payload = await response.json();
              errorText = payload?.error || errorText;
            } catch (_) {}
            throw new Error(errorText);
          }

          const blob = await response.blob();
          const filename = parseDownloadFilename(response.headers.get('Content-Disposition')) || '';
          downloadClipBlob(blob, filename);
          updateClipPreviewUi('Clipe exportado');
        } catch (error) {
          setClipModalError(error?.message || 'Não foi possível exportar o clipe.');
        } finally {
          state.clipExportInFlight = false;
          renderClipModalState({ syncInputs: false, syncSliders: false, syncPreview: false });
        }
      };

      const setupVideoEvents = () => {
        video.addEventListener('click', async () => {
          if (state.settingsPopoverOpen || state.episodesPopoverOpen || state.clipModalOpen) return;
          markSubtitleUiActivity(1800);
          try {
            if (video.paused) {
              await video.play();
            } else {
              video.pause();
            }
          } catch (_) {}
        });

        video.addEventListener('loadedmetadata', () => {
          markStreamStartupSuccess();
          updateTimeUi();
          updateSkipPrompt();
          updateNextEpisodePrompt();
          updateFinalEpisodeHeroState();
          if (USE_CANONICAL_SUBTITLE_CONTROLLER) {
            syncSubtitleCatalogFromNativeTracks();
            scheduleCanonicalSubtitleReconcile('loadedmetadata', 60);
          }
          applyCaptionState();
          bindSubtitleTrackOffsetSync();
          setControlsVisible(true);
          scheduleSubtitleLiftDown(1800);
          syncHeaderTitleState();
          consumePendingPlaybackRestore();
        });

        video.addEventListener('durationchange', () => {
          updateTimeUi();
          updateSkipPrompt();
          updateNextEpisodePrompt();
          updateFinalEpisodeHeroState();
          consumePendingPlaybackRestore();
        });
        video.addEventListener('timeupdate', () => {
          updateTimeUi();
          updateSkipPrompt();
          updateNextEpisodePrompt();
          updateFinalEpisodeHeroState();
          postProgress({ force: false, complete: false }).catch(() => null);
        });

        video.addEventListener('progress', updateTimeUi);
        video.addEventListener('play', () => {
          setBuffering(false);
          applyPlayState();
          updateSkipPrompt();
          updateNextEpisodePrompt();
          updateFinalEpisodeHeroState();
          syncHeaderTitleState();
          if (!shouldKeepUiVisible()) {
            scheduleSubtitleLiftDown(1400);
          }
        });
        video.addEventListener('pause', () => {
          applyPlayState();
          updateSkipPrompt();
          state.nextPromptShownForUiSession = false;
          setControlsVisible(true);
          updateFinalEpisodeHeroState();
          clearSubtitleLiftTimer();
          syncHeaderTitleState();
        });
        video.addEventListener('volumechange', updateVolumeUi);

        video.addEventListener('waiting', () => setBuffering(true));
        video.addEventListener('stalled', () => setBuffering(true));
        video.addEventListener('seeking', () => {
          setBuffering(true);
          updateSkipPrompt();
        });
        video.addEventListener('seeked', () => {
          setBuffering(false);
          updateSkipPrompt();
        });
        video.addEventListener('canplay', () => {
          markStreamStartupSuccess();
          setBuffering(false);
          updateSkipPrompt();
          updateFinalEpisodeHeroState();
          consumePendingPlaybackRestore();
        });
        video.addEventListener('playing', () => {
          markStreamStartupSuccess();
          setBuffering(false);
          updateSkipPrompt();
          updateFinalEpisodeHeroState();
          consumePendingPlaybackRestore();
        });

        video.addEventListener('error', async () => {
          hideSkipPrompt();
          const switched = await attemptBloggerFallback('video-element-error');
          if (switched) return;
          showError('Falha ao reproduzir vídeo.');
        });

        video.addEventListener('ended', () => {
          applyPlayState();
          hideSkipPrompt();
          hideNextEpisodePrompt();
          postProgress({ force: true, complete: true }).catch(() => null);
          if (!nextBtn.disabled) {
            setTimeout(() => navigateToEpisode('next', { forceAutoplay: true }), 900);
            return;
          }
          setTimeout(() => showWatchEndcard(), 420);
        });

        clipPreviewVideo.addEventListener('loadedmetadata', () => {
          if (!state.clipModalOpen) return;
          state.clipPreviewReady = true;
          updateClipPreviewUi();
          syncClipPreviewToSelection({ autoplay: true, forceSeek: true }).catch(() => null);
        });
        clipPreviewVideo.addEventListener('canplay', () => {
          if (!state.clipModalOpen) return;
          if (!state.clipPreviewReady) {
            state.clipPreviewReady = true;
            updateClipPreviewUi();
          }
        });
        clipPreviewVideo.addEventListener('play', () => {
          if (!state.clipModalOpen) return;
          updateClipPreviewUi();
        });
        clipPreviewVideo.addEventListener('pause', () => {
          if (!state.clipModalOpen) return;
          updateClipPreviewUi();
        });
        clipPreviewVideo.addEventListener('timeupdate', () => {
          if (!state.clipModalOpen) return;
          maintainClipPreviewLoop().catch(() => null);
        });
        clipPreviewVideo.addEventListener('ended', () => {
          if (!state.clipModalOpen) return;
          maintainClipPreviewLoop().catch(() => null);
        });
        clipPreviewVideo.addEventListener('click', () => {
          if (!state.clipModalOpen || !state.clipPreviewReady) return;
          if (clipPreviewVideo.paused) {
            clipPreviewVideo.play().catch(() => null);
          } else {
            clipPreviewVideo.pause();
          }
        });
        clipPreviewVideo.addEventListener('error', () => {
          if (!state.clipModalOpen) return;
          setClipModalError('Não foi possível carregar a prévia do clipe.');
          updateClipPreviewUi('Falha ao carregar prévia');
        });
      };

      const setupControlEvents = () => {
        setControlsVisible(true);

        const commitClipFields = (group) => {
          if (!state.clipModalOpen) return;
          const nextValue = readClipFieldGroup(group);
          if (group === 'start') {
            applyClipSelection(nextValue, state.clipEndMs, 'start');
            return;
          }
          applyClipSelection(state.clipStartMs, nextValue, 'end');
        };

        const clipInputs = [
          clipStartHours,
          clipStartMinutes,
          clipStartSeconds,
          clipStartMillis,
          clipEndHours,
          clipEndMinutes,
          clipEndSeconds,
          clipEndMillis
        ];

        playerShell.addEventListener('pointerenter', () => {
          markSubtitleUiActivity(1800);
        });

        playerShell.addEventListener('pointerleave', () => {
          controlsPointerInside = false;
          if (!shouldKeepUiVisible()) {
            scheduleSubtitleLiftDown(220);
          }
        });

        playerShell.addEventListener('pointermove', () => {
          markSubtitleUiActivity(1800);
        });

        playerShell.addEventListener('touchstart', () => {
          markSubtitleUiActivity(2200);
        }, { passive: true });

        mediaControls.addEventListener('pointerenter', () => {
          controlsPointerInside = true;
          setControlsVisible(true);
          clearSubtitleLiftTimer();
        });

        mediaControls.addEventListener('pointerleave', () => {
          controlsPointerInside = false;
          if (!shouldKeepUiVisible()) {
            scheduleSubtitleLiftDown(260);
          }
        });

        mediaControls.addEventListener('focusin', () => {
          setControlsVisible(true);
          clearSubtitleLiftTimer();
        });

        mediaControls.addEventListener('focusout', () => {
          if (!shouldKeepUiVisible()) {
            scheduleSubtitleLiftDown(320);
          }
        });

        playBtn.addEventListener('click', async () => {
          try {
            if (video.paused) {
              await video.play();
            } else {
              video.pause();
            }
          } catch (_) {}
        });

        muteBtn.addEventListener('click', () => {
          video.muted = !video.muted;
          if (!video.muted && video.volume <= 0) {
            video.volume = 0.4;
          }
          updateVolumeUi();
        });

        nextBtn.addEventListener('click', () => navigateToEpisode('next'));
        watchSkipToastBtn?.addEventListener('click', () => {
          skipCurrentSegment({ auto: false }).catch(() => null);
        });
        watchNextToastBtn.addEventListener('click', () => navigateToEpisode('next', { forceAutoplay: true }));
        watchEndcardReplayBtn.addEventListener('click', async () => {
          hideWatchEndcard();
          try {
            video.currentTime = 0;
          } catch (_) {}
          state.hasSentComplete = false;
          await playVideoSafe();
        });
        watchEndcardRatingButtons.forEach((button) => {
          button.addEventListener('click', () => {
            const sentiment = String(button.dataset.ratingValue || '').trim().toLowerCase();
            submitAnimeRating(sentiment).catch(() => null);
          });
        });
        captionsBtn.addEventListener('click', toggleCaptions);
        settingsBtn.addEventListener('click', (event) => {
          event.stopPropagation();
          toggleSettingsPopover();
        });
        episodesBtn.addEventListener('click', (event) => {
          event.stopPropagation();
          setSettingsPopoverOpen(false);
          toggleEpisodesPopover();
        });
        screenshotBtn.addEventListener('click', captureScreenshot);
        clipBtn?.addEventListener('click', () => {
          openClipModal().catch(() => null);
        });
        commentsBtn?.addEventListener('click', () => {
          setCommentsPanelOpen(!state.commentsPanelOpen).catch(() => null);
        });
        commentsCloseBtn?.addEventListener('click', () => {
          setCommentsPanelOpen(false).catch(() => null);
        });
        commentsPanelBackdrop?.addEventListener('click', (event) => {
          if (event.target !== commentsPanelBackdrop) return;
          setCommentsPanelOpen(false).catch(() => null);
        });
        commentsInput?.addEventListener('input', () => {
          updateCommentsCharCount();
          if (commentsFormError && !commentsFormError.hidden) {
            setCommentsFormError('');
          }
        });
        commentsInput?.addEventListener('keydown', (event) => {
          if (event.key !== 'Enter' || event.shiftKey) return;
          event.preventDefault();
          submitEpisodeComment().catch(() => null);
        });
        commentsForm?.addEventListener('submit', (event) => {
          event.preventDefault();
          submitEpisodeComment().catch(() => null);
        });
        clipModalCloseBtn?.addEventListener('click', () => {
          closeClipModal({ restorePlayback: true }).catch(() => null);
        });
        clipModalCancelBtn?.addEventListener('click', () => {
          closeClipModal({ restorePlayback: true }).catch(() => null);
        });
        clipModalBackdrop?.addEventListener('click', (event) => {
          if (event.target !== clipModalBackdrop) return;
          closeClipModal({ restorePlayback: true }).catch(() => null);
        });
        clipPreviewPlayBtn?.addEventListener('click', () => {
          if (!state.clipModalOpen || !state.clipPreviewReady) return;
          if (clipPreviewVideo.paused) {
            syncClipPreviewToSelection({ autoplay: true, forceSeek: false }).catch(() => null);
            return;
          }
          clipPreviewVideo.pause();
        });
        clipExportBtn?.addEventListener('click', () => {
          exportClipSelection().catch(() => null);
        });
        clipStartRange?.addEventListener('input', () => {
          applyClipSelection(Number(clipStartRange.value || 0), state.clipEndMs, 'start');
        });
        clipEndRange?.addEventListener('input', () => {
          applyClipSelection(state.clipStartMs, Number(clipEndRange.value || 0), 'end');
        });
        clipInputs.forEach((input) => {
          input?.addEventListener('change', () => {
            const group = input.id.toLowerCase().includes('start') ? 'start' : 'end';
            commitClipFields(group);
          });
          input?.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter') return;
            event.preventDefault();
            const group = input.id.toLowerCase().includes('start') ? 'start' : 'end';
            commitClipFields(group);
          });
        });
        settingsMainAutoplayRow.addEventListener('click', async () => {
          state.userPrefs.autoplay = !state.userPrefs.autoplay;
          updateAutoplayToggleUi();
          await saveUserPrivacyPrefs({ autoplay: !!state.userPrefs.autoplay });
        });
        settingsMainAudioBtn.addEventListener('click', () => {
          state.settingsView = 'audio';
          renderSettingsPopover();
          positionSettingsPopover();
        });
        settingsMainQualityBtn.addEventListener('click', () => {
          state.settingsView = 'quality';
          renderSettingsPopover();
          positionSettingsPopover();
        });
        settingsMainSubtitleBtn.addEventListener('click', () => {
          state.settingsView = 'subtitle';
          renderSettingsPopover();
          positionSettingsPopover();
        });
        settingsBackBtn.addEventListener('click', () => {
          state.settingsView = 'main';
          renderSettingsPopover();
          positionSettingsPopover();
        });

        castBtn.addEventListener('click', () => {
          if (castBtn.disabled) return;
          openCastSession();
        });

        pipBtn.addEventListener('click', async () => {
          try {
            if (document.pictureInPictureElement === video) {
              await document.exitPictureInPicture();
            } else if (document.pictureInPictureEnabled) {
              await video.requestPictureInPicture();
            }
          } catch (_) {}
          applyPipState();
        });

        fullscreenBtn.addEventListener('click', async () => {
          try {
            if (document.fullscreenElement === playerShell) {
              await document.exitFullscreen();
            } else {
              await playerShell.requestFullscreen();
            }
          } catch (_) {}
          applyFullscreenState();
        });

        volumeSlider.addEventListener('pointerdown', (event) => {
          state.volumeDrag = true;
          setControlsVisible(true);
          clearSubtitleLiftTimer();
          if (volumeWrap) volumeWrap.setAttribute('data-open', 'true');
          volumeSlider.setAttribute('data-active', 'true');
          volumeSlider.setAttribute('data-dragging', 'true');
          setVolumeFromClientX(event.clientX);
        });

        window.addEventListener('pointermove', (event) => {
          if (event.target && playerShell.contains(event.target)) {
            markSubtitleUiActivity(1800);
          }

          if (state.volumeDrag) {
            setVolumeFromClientX(event.clientX);
          }

          if (!state.sliderDrag) return;
          const rect = timeSlider.getBoundingClientRect();
          if (!rect.width) return;
          const ratio = clamp((event.clientX - rect.left) / rect.width, 0, 1);
          const percent = ratio * 100;
          timeSlider.style.setProperty('--slider-fill', `${percent}%`);
          timeSliderFill.style.width = `${percent}%`;
          showSliderPreview();
          updateSliderPreview(event.clientX);
        });

        window.addEventListener('pointerup', (event) => {
          if (state.volumeDrag) {
            state.volumeDrag = false;
            volumeSlider.removeAttribute('data-dragging');
            volumeSlider.removeAttribute('data-active');
            if (volumeWrap) volumeWrap.removeAttribute('data-open');
            if (!shouldKeepUiVisible()) {
              scheduleSubtitleLiftDown(1000);
            }
          }

          if (!state.sliderDrag) return;
          state.sliderDrag = false;
          const rect = timeSlider.getBoundingClientRect();
          if (rect.width) {
            const ratio = clamp((event.clientX - rect.left) / rect.width, 0, 1);
            seekToRatio(ratio);
          }
          timeSlider.removeAttribute('data-dragging');
          timeSlider.removeAttribute('data-active');
          hideSliderPreview();
          if (!shouldKeepUiVisible()) {
            scheduleSubtitleLiftDown(1000);
          }
        });

        timeSlider.addEventListener('pointerdown', (event) => {
          state.sliderDrag = true;
          setControlsVisible(true);
          clearSubtitleLiftTimer();
          timeSlider.setAttribute('data-active', 'true');
          timeSlider.setAttribute('data-dragging', 'true');
          showSliderPreview();
          updateSliderPreview(event.clientX);
        });

        timeSlider.addEventListener('pointermove', (event) => {
          timeSlider.setAttribute('data-active', 'true');
          showSliderPreview();
          updateSliderPreview(event.clientX);
        });

        timeSlider.addEventListener('mouseenter', () => {
          timeSlider.setAttribute('data-active', 'true');
          setControlsVisible(true);
        });

        timeSlider.addEventListener('mouseleave', () => {
          if (!state.sliderDrag) {
            timeSlider.removeAttribute('data-active');
            hideSliderPreview();
          }
        });

        timeSlider.addEventListener('keydown', (event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            video.currentTime = Math.max(0, (video.currentTime || 0) - 5);
            return;
          }
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            video.currentTime = Math.min(video.duration || Number.MAX_SAFE_INTEGER, (video.currentTime || 0) + 5);
            return;
          }
        });

        document.addEventListener('pointerdown', (event) => {
          const target = event.target;
          if (state.clipModalOpen && clipModalBackdrop.contains(target)) {
            return;
          }
          if (state.commentsPanelOpen && commentsPanelBackdrop.contains(target)) {
            return;
          }
          if (state.episodesPopoverOpen) {
            if (!(episodesPopover.contains(target) || episodesBtn.contains(target))) {
              setEpisodesPopoverOpen(false);
            }
          }
          if (state.settingsPopoverOpen) {
            if (!(settingsPopover.contains(target) || settingsBtn.contains(target))) {
              setSettingsPopoverOpen(false);
            }
          }
        }, true);

        document.addEventListener('keydown', (event) => {
          const isInput = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName);

          if (state.clipModalOpen) {
            if (event.key === 'Escape') {
              event.preventDefault();
              closeClipModal({ restorePlayback: true }).catch(() => null);
            }
            return;
          }

          if (state.commentsPanelOpen) {
            if (event.key === 'Escape') {
              event.preventDefault();
              setCommentsPanelOpen(false).catch(() => null);
            }
            return;
          }

          if (event.key === 'Escape' && (state.episodesPopoverOpen || state.settingsPopoverOpen)) {
            setEpisodesPopoverOpen(false);
            setSettingsPopoverOpen(false);
            return;
          }

          if (isInput) return;

          markSubtitleUiActivity(2200);

          if (event.key === ' ') {
            event.preventDefault();
            if (video.paused) {
              video.play().catch(() => null);
            } else {
              video.pause();
            }
          }

          if (event.key.toLowerCase() === 'f') {
            event.preventDefault();
            fullscreenBtn.click();
          }

          if (event.key.toLowerCase() === 'm') {
            event.preventDefault();
            muteBtn.click();
          }

          if (
            event.key.toLowerCase() === 'c' &&
            !event.ctrlKey &&
            !event.metaKey &&
            !event.altKey &&
            !event.shiftKey
          ) {
            event.preventDefault();
            captionsBtn.click();
          }

          if ((event.ctrlKey || event.metaKey) && event.key === 'ArrowRight' && !nextBtn.disabled) {
            event.preventDefault();
            navigateToEpisode('next');
          }

          if (state.endcardVisible && event.key === 'Enter') {
            event.preventDefault();
            watchEndcardPrimaryLink.click();
          }

          if ((event.altKey && event.shiftKey) && event.key.toLowerCase() === 's') {
            event.preventDefault();
            screenshotBtn.click();
          }
        });

        window.addEventListener('resize', () => {
          if (state.episodesPopoverOpen) positionEpisodesPopover();
          if (state.settingsPopoverOpen) positionSettingsPopover();
          refreshAssFallbackCueStyle();
        }, { passive: true });

        window.addEventListener('scroll', () => {
          if (state.episodesPopoverOpen) positionEpisodesPopover();
          if (state.settingsPopoverOpen) positionSettingsPopover();
        }, { passive: true });

        document.addEventListener('fullscreenchange', applyFullscreenState);
        document.addEventListener('enterpictureinpicture', applyPipState);
        document.addEventListener('leavepictureinpicture', applyPipState);
        window.addEventListener('cast-ready', setupCastAvailability);
      };

      const loadWatchData = async () => {
        showBootstrapBuffering();

        const { seasonToken, episodeToken } = extractWatchRouteTokens();
        if (!seasonToken || !episodeToken) {
          showError('URL de episódio inválida.');
          return;
        }

        state.currentSeasonToken = seasonToken;
        state.currentEpisodeRouteToken = String(episodeToken || '').trim();
        state.currentEpisodeToken = normalizeEpisodeToken(episodeToken);

        const search = window.location.search || '';
        const searchParams = new URLSearchParams(search);
        state.forcePlaybackOnLoad = searchParams.get('autonext') === '1';
        const requestedResumeSeconds = Math.max(
          consumeWatchNavigationIntentResume(),
          parseResumeSecondsFromSearch()
        );

        try {
          const response = await fetch(`/api/watch/${encodeURIComponent(seasonToken)}/${encodeURIComponent(episodeToken)}${search}`, {
            credentials: 'same-origin',
            cache: 'no-store'
          });
          const data = await response.json();
          if (!response.ok || data.error) {
            throw new Error(data.error || 'Falha ao carregar episódio');
          }

          state.userPrefs = {
            audioLang: data.preferences?.audioLang || null,
            subtitleLang: data.preferences?.subtitleLang || null,
            preferDub: !!data.preferences?.preferDub,
            autoSkipIntro: !!data.preferences?.autoSkipIntro,
            autoplay: !!(data.preferences?.autoplay ?? data.autoplay)
          };
          state.activeSubtitleOptionId = normalizeSubtitleLangAlias(state.userPrefs.subtitleLang, { allowOff: true }) === 'off'
            ? 'off'
            : null;
          state.subtitleInitialSelectionApplied = state.activeSubtitleOptionId === 'off';
          state.subtitleCatalog = [];
          state.subtitleCatalogVersion = 0;
          setSubtitleRuntimeState(null, 'off', null);
          state.assFallbackOptionId = null;
          state.subtitleExclusions = Array.isArray(data.episode?.subtitle_exclusions)
            ? data.episode.subtitle_exclusions
            : [];

          state.currentSeasonNumber = Number(data.season?.number || data.season?.temporada || data.episode?.temporada || 1) || 1;
          state.allEpisodes = Array.isArray(data.season?.episodios) ? data.season.episodios : [];
          state.navigationNext = data.navigation?.next || null;
          state.navigationPrev = data.navigation?.prev || null;

          state.animeId = data.anime?.id || null;
          state.animeSlug = data.anime?.slug || null;
          state.animeName = data.anime?.nome || null;
          state.episodeId = data.episode?.id || null;
          state.episodeTitle = data.episode?.episode_title || data.episode?.nome || null;
          state.episodeNumber = data.episode?.numero || data.episode?.episode_number || null;
          state.animeCoverUrl = data.anime?.imagem_capa || data.anime?.poster_url || data.anime?.banner_url || null;
          state.animeTitleImageUrl = data.anime?.titulo_imagem || null;
          state.temporada = data.episode?.temporada || 1;
          state.endcardRecommendations = Array.isArray(data.endcard?.recommendations) ? data.endcard.recommendations : [];
          state.currentAnimeRating = String(data.endcard?.rating?.currentUserRating || '').trim().toLowerCase() || null;
          state.animeRatingCounts = data.endcard?.rating?.counts || { odiei: 0, gostei: 0, amei: 0 };
          state.animeRatingTotal = Number(data.endcard?.rating?.total || 0);
          state.commentsCount = Math.max(0, Number(data.comments?.count || 0));
          state.commentsCanPost = !!data.comments?.canComment;
          state.commentsItems = [];
          state.commentsViewer = null;
          state.commentsLoadedEpisodeId = null;
          renderCommentsBadge();
          renderCommentsPanel();
          updateCommentsCharCount();
          state.skipData = normalizeSkipPayload(data.skip);
          state.skipPromptVisible = false;
          state.skipCurrentType = null;
          state.skipAutoApplied = {
            intro: false,
            recap: false,
            credits: false,
            preview: false
          };
          hideSkipPrompt();
          state.clipAllowed = !!data.permissions?.canClip;
          state.clipMaxDurationMs = Math.max(
            CLIP_MIN_DURATION_MS,
            Math.round(Number(data.permissions?.clipMaxDurationMs) || (5 * 60 * 1000))
          );
          if (clipBtn) {
            clipBtn.hidden = !state.clipAllowed;
          }
          state.currentTime = Math.max(
            0,
            Number(data.progress?.resumeSeconds) || 0,
            requestedResumeSeconds
          );
          state.duration = Math.max(0, Number(data.progress?.duration) || 0);
          state.currentTime = clampResumeRestoreTime(state.currentTime, state.duration);
          state.lastSavedTime = state.currentTime;
          state.hasSentComplete = false;
          hideWatchEndcard();
          hideNextEpisodePrompt();

          const animeName = data.anime?.nome || data.episode?.nome || 'BerryAnimes';
          const episodeNumber = data.episode?.numero || data.episode?.episode_number || null;
          const baseTitle = cleanEpisodeTitle(data.episode?.episode_title || data.episode?.nome || animeName);
          applyHeaderTitle({
            title: baseTitle,
            episodeNumber,
            titleImageUrl: state.animeTitleImageUrl
          });

          const playerData = data.player || {};
          state.bloggerFallbackUrl = String(
            playerData.fallbackBloggerUrl
            || playerData.bloggerUrl
            || playerData.embed_url
            || ''
          ).trim() || null;
          state.bloggerFallbackAttempted = false;
          let streamUrl = resolveStreamUrlFromPlayerData(playerData);
          let typeHint = playerData.mimeType || playerData.type || '';
          const explicitExternalEmbedUrl =
            String(playerData.externalEmbedUrl || '').trim()
            || (playerData.externalEmbed ? String(playerData.embed_url || '').trim() : '');
          const bloggerEmbedFrameUrl =
            String(playerData.provider || '').toLowerCase() === 'blogger'
              ? (
                  explicitExternalEmbedUrl
                  || resolveBloggerIframeUrl(playerData.embed_url || '')
                  || null
                )
              : null;

          if (
            !streamUrl &&
            !explicitExternalEmbedUrl &&
            String(playerData.provider || '').toLowerCase() === 'blogger' &&
            playerData.embed_url
          ) {
            const directStreamUrl = resolveDirectBloggerStreamUrl(playerData.embed_url);
            if (directStreamUrl) {
              streamUrl = directStreamUrl;
              typeHint = inferDirectStreamTypeHint(directStreamUrl);
            } else {
              const direct = await fetchBloggerDirectStream(playerData.embed_url);
              if (direct?.playUrl) {
                streamUrl = direct.playUrl;
                typeHint = inferDirectStreamTypeHint(direct.playUrl);
              }
            }
          }

          if (!streamUrl && bloggerEmbedFrameUrl) {
            streamUrl = bloggerEmbedFrameUrl;
            typeHint = 'text/html';
          }

          if (!streamUrl) {
            throw new Error('Fonte de vídeo indisponível para este episódio.');
          }

          await attachStream({
            streamUrl,
            typeHint,
            playerData
          });
          schedulePlaybackRestore(state.currentTime, false);

          if (hasCodexWatchSubtitleTracks(data)) {
            state.assSubtitleUrl = null;
            state.assSubtitleMeta = null;
            state.assSubtitleSource = null;
            state.assSubtitleCandidates = [];
            syncManagedAssDebugDataset();
          } else {
            const managedSubtitleRawCandidates = collectManagedSubtitleUrls(data, { assOnly: false });
            const managedSubtitleCacheToken = buildSubtitleCacheToken(
              data?.episode?.subtitle_meta?.updated_at
              || data?.episode?.subtitle_meta?.id
              || ''
            );
            const managedSubtitleCandidates = managedSubtitleRawCandidates
              .map((candidateUrl) => withSubtitleCacheToken(candidateUrl, managedSubtitleCacheToken))
              .filter((candidateUrl) => isSupportedManagedSubtitleUrl(candidateUrl))
              .filter((candidateUrl, index, array) => array.indexOf(candidateUrl) === index);
            const managedAssSubtitleUrl = managedSubtitleCandidates.find((candidateUrl) => isAssSubtitleUrl(candidateUrl)) || null;
            const managedSubtitleUrl = managedAssSubtitleUrl || managedSubtitleCandidates[0] || null;
            const managedAssSubtitleRawProbeUrl = managedSubtitleRawCandidates.find((candidateUrl) => isAssSubtitleUrl(candidateUrl)) || null;
            const managedSubtitleMetaProbeUrl =
              managedAssSubtitleRawProbeUrl ||
              managedSubtitleRawCandidates[0] ||
              managedSubtitleUrl ||
              '';
            state.assSubtitleCandidates = managedSubtitleCandidates.filter((candidateUrl) => isAssSubtitleUrl(candidateUrl));
            if (managedSubtitleUrl) {
              const managedSubtitleMeta = {
                ...(pickAssSubtitleMeta(data, managedSubtitleMetaProbeUrl) || {}),
                candidateUrls: state.assSubtitleCandidates.slice(),
                source: 'managed'
              };
              const inlineManagedAssContent = typeof data?.episode?.subtitle_meta?.content === 'string'
                ? data.episode.subtitle_meta.content
                : '';
              if (!managedSubtitleMeta.content && inlineManagedAssContent.trim()) {
                managedSubtitleMeta.content = inlineManagedAssContent;
              }
              if (isAssSubtitleUrl(managedSubtitleUrl)) {
                const inlineStyleSource = typeof managedSubtitleMeta?.content === 'string'
                  ? managedSubtitleMeta.content
                  : '';
                state.assSubtitleUrl = managedSubtitleUrl;
                state.assSubtitleMeta = managedSubtitleMeta || null;
                state.assSubtitleSource = 'managed';
                syncManagedAssDebugDataset();
                primeAssCueStyleProfile(managedSubtitleUrl, inlineStyleSource).catch(() => null);
              } else {
                state.assSubtitleUrl = null;
                state.assSubtitleMeta = null;
                state.assSubtitleSource = null;
                state.assSubtitleCandidates = [];
                syncManagedAssDebugDataset();
              }
            } else {
              state.assSubtitleCandidates = [];
            }
          }

          updateNextButton();
          updateVolumeUi();
          updateTimeUi();

          requestAnimationFrame(() => {
            Promise.resolve()
              .then(() => {
                primeAssCueStyleFromWatchData(data).catch(() => null);
                syncSubtitleCatalogFromWatchData(data);
              })
              .then(() => ensureCanonicalSubtitleSelectionInitialized('watch_data'))
              .then(() => {
                applyCaptionState();
                renderEpisodesPopover();
                renderSettingsPopover();
                setupCastAvailability();
                applyPlayState();
              })
              .catch(() => {
                renderSettingsPopoverAuto();
              });
          });
        } catch (error) {
          showError(error?.message || 'Erro ao carregar episódio');
        }
      };

      window.addEventListener('pagehide', () => {
        destroyClipPreview();
        postProgress({ keepalive: true, force: true, complete: hasCompletion() }).catch(() => null);
      });

      window.addEventListener('beforeunload', () => {
        destroyClipPreview();
        postProgress({ keepalive: true, force: true, complete: hasCompletion() }).catch(() => null);
      });

      setupVideoEvents();
      renderEndcardReactionIcons();
      setupControlEvents();
      bindAssRuntimeErrorGuard();
      loadWatchData();
}

if (typeof window !== 'undefined') {
  window.BerryWebPlayer = Object.assign(window.BerryWebPlayer || {}, {
    bootstrapBerryWatchPage
  });
}

export default bootstrapBerryWatchPage;
