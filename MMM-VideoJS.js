/* global Module */

/* Magic Mirror
 * Module: MMM-VideoJS
 *
 * By Brent Pabst
 * MIT Licensed.
 */

Module.register("MMM-VideoJS", {
    // Default module config
    defaults: {
        videoUrl: "https://media-hls.wral.com/livehttporigin/_definst_/mp4:north_hills_mall.stream/playlist.m3u8",
    },

    // Override start function
    start: function () {
        Log.log("Starting module: " + this.name);
    },
    getStyles: function() {
        return [this.file("node_modules/video.js/dist/video-js.min.css"), this.file("MMM-VideoJS.css")]
    },
    getScripts: function () {
		return [this.file("node_modules/video.js/dist/video.min.js")];
	},
    getDom: function() {
        const wrapper = document.createElement("div");
        wrapper.className = "MMM-VideoJS"

        const videoElement = document.createElement("video-js");
        
        var videoSource = document.createElement('source');
        videoSource.setAttribute('src', this.config.videoUrl);
        videoSource.setAttribute('type', 'application/x-mpegURL');
        
        videoElement.appendChild(videoSource);

        const overlay = document.createElement("div");
        overlay.className = "overlay";
        
        wrapper.appendChild(videoElement);
        wrapper.appendChild(overlay);

        const player = videojs(videoElement, {
            controls: false,
            autoplay: true,
            muted: true,
            preload: 'auto',
            fluid: true,
          }, () => {
            videojs.log('player is ready');
        });
        
        return wrapper;
    },
});