document.addEventListener("DOMContentLoaded", function() {
    const playButtons = document.querySelectorAll(".play-button");
    let currentAudio = null;
    let currentButton = null;
    let currentUserPic = null;

    playButtons.forEach((button, index) => {
        const audioUrl = button.getAttribute("data-audio");
        const audio = new Audio(audioUrl);
        const userInfo = button.closest(".user-info");
        const userPic = userInfo ? userInfo.querySelector(".user-pic") : null;
        const authorReply = button.closest(".author-reply");
        const authorPic = authorReply ? authorReply.querySelector(".author-reply-pic") : null;
        const targetPic = userPic || authorPic;  // Choose the appropriate picture

        const playSvg = '<img src="https://github.com/malenaohl/demohouse/blob/main/resources/play-button.svg?raw=true" alt="Play">';
        const pauseSvg = '<img src="https://github.com/malenaohl/demohouse/blob/main/resources/pause-circle.svg?raw=true" alt="Pause">';

        button.innerHTML = playSvg;
        button.setAttribute("data-fallback", "▶");

        button.addEventListener("click", function() {
            if (currentAudio && currentAudio !== audio) {
                // Pause the currently playing audio
                currentAudio.pause();
                if (currentButton) {
                    currentButton.innerHTML = playSvg;
                    currentButton.setAttribute("data-fallback", "▶");
                    currentButton.classList.remove("pause-button");
                    currentButton.classList.add("play-button");
                    currentButton.classList.remove("fallback");
                }
                if (currentUserPic) {
                    currentUserPic.classList.remove("playing");
                }
            }

            if (audio.paused) {
                // Play the new audio
                audio.play();
                button.innerHTML = pauseSvg;
                button.setAttribute("data-fallback", "⏸");
                button.classList.remove("play-button");
                button.classList.add("pause-button");
                button.classList.remove("fallback");
                if (targetPic) {
                    targetPic.classList.add("playing");
                }
            } else {
                // Pause the currently playing audio
                audio.pause();
                button.innerHTML = playSvg;
                button.setAttribute("data-fallback", "▶");
                button.classList.remove("pause-button");
                button.classList.add("play-button");
                button.classList.remove("fallback");
                if (targetPic) {
                    targetPic.classList.remove("playing");
                }
            }

            // Update the currently playing audio and elements
            currentAudio = audio;
            currentButton = button;
            currentUserPic = targetPic;
        });

        // Reset when the audio ends and play the next audio
        audio.addEventListener("ended", () => {
            button.innerHTML = playSvg;
            button.setAttribute("data-fallback", "▶");
            button.classList.remove("pause-button");
            button.classList.add("play-button");
            button.classList.remove("fallback");
            if (targetPic) {
                targetPic.classList.remove("playing");
            }

            currentAudio = null;
            currentButton = null;
            currentUserPic = null;

            // Play the next audio if available
            const nextButton = playButtons[index + 1];
            if (nextButton) {
                nextButton.click();
            }
        });

        // Check if SVG failed to load and apply fallback
        const img = button.querySelector('img');
        img.onerror = () => {
            button.classList.add('fallback');
        };
    });

    // Function to set the height of the viewport
    const setVh = () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set the initial height
    setVh();

    // Update the height on resize
    window.addEventListener('resize', setVh);
});
