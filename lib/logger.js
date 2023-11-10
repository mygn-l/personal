const log = function (title, content) {
  let text = "";
  text += title;
  for (let i = 0; i < Math.abs(log.title_length - title.length); i++) {
    text += " ";
  }
  text += ":";
  for (let i = 0; i < log.content_space; i++) {
    text += " ";
  }
  text += content;

  console.log(text);
};

log.title_length = 15;
log.content_space = 5;

export default log;
