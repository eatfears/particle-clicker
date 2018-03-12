// http://particle-clicker.web.cern.ch/particle-clicker/

function nFormatter(num, digits)
{
  var si = [
    { value: 1, symbol: "" },
    { value: 1E3, symbol: "k" },
    { value: 1E6, symbol: "M" },
    { value: 1E9, symbol: "B" },
    { value: 1E12, symbol: "T" },
    { value: 1E15, symbol: "P" },
    { value: 1E18, symbol: "E" }
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--)
  {
    if (num >= si[i].value)
    {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

var evObj = document.createEvent('Events');
evObj.initEvent('click', true, false);
var collider = document.getElementById('detector-events');

function click()
{
  collider.dispatchEvent(evObj);
}

function count_vals()
{
  var $lis = $("li.media.ng-scope");
  $lis.each(function()
  {
    // $( this ).addClass( "foo" );
    var $strong = $( this ).find("p strong");
    if ($strong)
    {
      var str_val = parseFloat($strong.text().replace(/[\sA-Za-z]/g, ""));
      var btn_val = 0;
      var res_val = 0;
      var s_p = 1;
      var m_p = 1;

      if ($strong.text().match("k"))
      {
        s_p = 3;
      }
      if ($strong.text().match("M"))
      {
        s_p = 6;
      }
      if ($strong.text().match("B"))
      {
        s_p = 9;
      }
      if ($strong.text().match(/\dT/g))
      {
        s_p = 12;
      }
      if ($strong.text().match(/\dP/g))
      {
        s_p = 15;
      }
      if ($strong.text().match(/\dE/g))
      {
        s_p = 18;
      }

      var $button = $strong.parent().parent().find("button.btn.btn-primary small");

      btn_val = parseFloat($button.text().replace(/[\sA-Za-z]/g, ""));
      if ($button.text().match("k"))
      {
        m_p = 3;
      }
      if ($button.text().match("M"))
      {
        m_p = 6;
      }
      if ($button.text().match("B"))
      {
        m_p = 9;
      }
      if ($button.text().match(/\dT/g))
      {
        m_p = 12;
      }
      if ($button.text().match(/\dP/g))
      {
        m_p = 15;
      }
      if ($button.text().match(/\dE/g))
      {
        m_p = 18;
      }


      // console.log(btn_val);
      res_val = nFormatter(btn_val / str_val * Math.pow(10, m_p - s_p), 1);


      var $res = $strong.parent().find("b");

      if ($res.length)
      {
        $res.text(res_val);
      }
      else
      {
        $strong.parent().append(" <b>" + res_val + "</b>");
      }
    }
  });
}

count_vals();

$("button").click(function()
{
  count_vals();
});

var click_interval1 = setInterval(click, 0);

// window.clearInterval(click_interval1);
