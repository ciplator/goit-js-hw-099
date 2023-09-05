import Vimeo from "@vimeo/player";
import throttle from "lodash.throttle";

const player = new Vimeo(document.getElementById("vimeo-player"));

const saveCurrentTime = throttle(async (time) => {
  try {
    await localStorage.setItem(
      "videoplayer-current-time",
      JSON.stringify(time)
    );
  } catch (error) {
    console.error("Error save time", error);
  }
}, 1000);
player.on("timeupdate", (data) => {
  const currentTime = data.seconds;
  saveCurrentTime(currentTime);
});

const restoreTime = async () => {
  try {
    const savedTime = await localStorage.getItem("videoplayer-current-time");
    if (savedTime !== null) {
      const currentTime = JSON.parse(savedTime);
      player.setCurrentTime(currentTime);
    }
  } catch (error) {
    console.error("Error save time", error);
  }
};
restoreTime();
