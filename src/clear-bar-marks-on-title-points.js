function clearMarksInExercise(exercise) {
  if (!exercise) return;
  var marks = Array.prototype.slice.call(exercise.querySelectorAll('.bar-mark'));
  marks.forEach(function (mark) {
    mark.dispatchEvent(new MouseEvent('dblclick', { bubbles: true, cancelable: true }));
  });
}

document.addEventListener('click', function (event) {
  var button = event.target && event.target.closest && event.target.closest('.exercise-title-controls button');
  if (!button || button.disabled) return;
  var exercise = button.closest('.exam-exercise');
  setTimeout(function () {
    clearMarksInExercise(exercise);
  }, 0);
}, true);
