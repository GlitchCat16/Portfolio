document.addEventListener('DOMContentLoaded', function () {
  M.AutoInit();
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
  var elems = document.querySelectorAll('.scrollspy');
  var instances = M.ScrollSpy.init(elems, {scrollOffset: 60});
});