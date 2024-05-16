export const randomUtils = {
    shuffleArray: function(array:Array<any>) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Đảo vị trí giữa array[i] và array[j]
      }
      return array;
    }
  };
  