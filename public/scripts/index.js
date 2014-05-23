$(function(){
  $("form").on("submit", function(event) {
      var args = $(this).find("#args").val()
      //- $(this).find("#args").val('')
      $.getJSON("/run?args="+args, function(output){
        $("#output").text(output)
      })
      return false
  })
})
