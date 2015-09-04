<!DOCTYPE html>
<html lang="en">
<head>

  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">

  <link type="image/ico" rel="shortcut icon" href="resources/images/meta/favicon.ico">

  <title>{{ app.meta.title | title }}</title>

  <meta name="keywords" content="{{ app.meta.keywords }}">
  <meta name="description" content="{{ app.meta.description }}">

  <!--Facebook Open Graph-->
  <meta property="og:title" content="{{ app.meta.title  | title }}">
  <meta property="og:url" content="{{ app.meta.url }}">
  <meta property="og:image" content="{{ app.meta.thumbnail }}">
  <meta property="og:description" content="{{ app.meta.description }}">
  <!--End Facebook-->

  <!--Twitter Card Data-->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:site" content="@{{ app.meta.twitterHandle }}">
  <meta name="twitter:url" content="{{ app.meta.url }}">
  <meta name="twitter:title" content="{{ app.meta.title  | title }}">
  <meta name="twitter:description" content="{{ app.meta.description }}">
  <meta name="twitter:image" content="{{ app.meta.thumbnail }}">
  <!--End Facebook-->

  {% if environment != 'development' %}
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', '{{ app.meta.googleAnalytics }}', 'auto');
    ga('send', 'pageview');
  </script>
  {% endif %}

  <!--[if lt IE 9]>
  <script type="text/javascript">
    alert('This app requires a modern browsers to run properly. Please update your browser then visit this page again.');
    window.location = "http://browsehappy.com/";
  </script>
  <![endif]-->
  <!--[if IE 9]>
  <script type="text/javascript">
    alert('This app requires a modern browsers to run properly. Please update your browser then visit this page again.');
    window.location = "http://browsehappy.com/";
  </script>
  <![endif]-->

  <link rel="stylesheet" href="{{ server.staticPaths.build }}stylesheets/app.css">

</head>
<body>

  <div class="app">

    <div class="intro">
      <table class="intro-text">
        <tbody>
          <tr>
            <td class="header-col"><h1>The<br><span class="callout"><strong>Living<br>Wage</strong></span><br>Map</h1></td>
            <td class="content-col">
              <p>An ongoing public debate about the struggle of low-income families to stay afloat raises a key question: how great is the gap between the minimum wage and the amount of money needed to meet a minimum standard of living?</p>
              <br>
              <p><a href="http://livingwage.mit.edu/" target="_blank">The Living Wage Calculator</a>, developed by <a href="http://dusp.mit.edu/faculty/amy-glasmeier" target="_blank">Professor Amy Glasmeier</a> of MIT, examines this question. Esri has map-enabled the Calculator data, revealing regional patterns. Tap below to explore the map.</p>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="loading-wrapper">
        <img class="loading-img" src="resources/images/loader.gif" alt="Loading">
        <p class="loading-text">Loading Map</p>
      </div>

      <div class="explore-wrapper">
        <p class="explore-text">Explore<br>Map</p>
        <div class="icon-down-open-big"></div>
      </div>

    </div>

    <div class="content">

      <div class="info-pane region-left">
        <div class="header region-top">
          <a href="//storymaps.arcgis.com" target="_blank" class="smLink region-left">A story map</a>
          <div class="share region-center">
            <span class="share-icon icon-facebook"></span>
            <span class="share-icon icon-twitter"></span>
            {# <span class="share-icon icon-link"></span> #}
          </div>
          <a href="//esri.com" target="_blank" class="logo region-right"></a>
        </div>
        <div class="main region-center">

          <div class="intro-text">
            <h1>The <span class="callout"><strong>Living Wage</strong></span> Map</h1>
          </div>

          <div class="statistics-pane">

            <div class="headings">
              <h4 class="location-name"></h4>
            </div><!--/headings-->

            <div class="sort-grid">

              <div class="working-parent wage-group active" data-sort="1">
                <div class="heading-area">
                  <div class="disabled-hidden">
                    <table class="class-heading-table">
                      <tbody>
                        <tr>
                          <td class="class-heading">
                            <h5>Parent with Spouse and Two Children</h5>
                          </td>
                           <td class="image-wrapper">
                            <img src="resources/images/art/workingParent.png" class="class-diagram" alt="Parent with Spouse and Two Children">
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h5 class="class-heading active-hidden">Parent with Spouse and Two Children</h5>

                  <table class="stats">
                    <tbody>
                      <tr>
                        <td class="living-wage-col">
                          <p class="stat-value"></p>
                        </td>
                        <td class="minimum-wage-col">
                          <p class="stat-value"></p>
                        </td>
                        <td class="wage-gap-col">
                          <p class="stat-value"></p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="content-area">
                  <div class="disabled-hidden">
                    <table class="category-headings">
                      <tbody>
                        <tr>
                          <td class="living-wage-col">
                            <h6 class="wage-heading">Living<br>Wage</h6>
                          </td>
                          <td class="minimum-wage-col">
                            <h6 class="wage-heading">Minimum<br>Wage</h6>
                          </td>
                          <td class="wage-gap-col">
                            <h6 class="wage-heading">The<br>Gap</h6>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div><!--/working-parent-->

              <div class="single-parent wage-group" data-sort="2">
                <div class="heading-area">
                  <div class="disabled-hidden">
                    <table class="class-heading-table">
                      <tbody>
                        <tr>
                          <td class="class-heading">
                            <h5>Single Parent with One Child</h5>
                          </td>
                          <td class="image-wrapper">
                            <img src="resources/images/art/singleParent.png" class="class-diagram" alt="Single Parent with One Child">
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h5 class="class-heading active-hidden">Single Parent with One Child</h5>

                  <table class="stats">
                    <tbody>
                      <tr>
                        <td class="living-wage-col">
                          <p class="stat-value"></p>
                        </td>
                        <td class="minimum-wage-col">
                          <p class="stat-value"></p>
                        </td>
                        <td class="wage-gap-col">
                          <p class="stat-value"></p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="content-area">
                  <div class="disabled-hidden">
                    <table class="category-headings">
                      <tbody>
                        <tr>
                          <td class="living-wage-col">
                            <h6 class="wage-heading">Living<br>Wage</h6>
                          </td>
                          <td class="minimum-wage-col">
                            <h6 class="wage-heading">Minimum<br>Wage</h6>
                          </td>
                          <td class="wage-gap-col">
                            <h6 class="wage-heading">The<br>Gap</h6>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div><!--/single-parent-->

              <div class="single-adult wage-group" data-sort="3">
                <div class="heading-area">
                  <div class="disabled-hidden">
                    <table class="class-heading-table">
                      <tbody>
                        <tr>
                          <td class="class-heading">
                            <h5>Single Adult</h5>
                          </td>
                          <td class="image-wrapper">
                            <img src="resources/images/art/singleAdult.png" class="class-diagram" alt="Single Adult">
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h5 class="class-heading active-hidden">Single Adult</h5>

                  <table class="stats">
                    <tbody>
                      <tr>
                        <td class="living-wage-col">
                          <p class="stat-value"></p>
                        </td>
                        <td class="minimum-wage-col">
                          <p class="stat-value"></p>
                        </td>
                        <td class="wage-gap-col">
                          <p class="stat-value"></p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="content-area">
                  <div class="disabled-hidden">
                    <table class="category-headings">
                      <tbody>
                        <tr>
                          <td class="living-wage-col">
                            <h6 class="wage-heading">Living<br>Wage</h6>
                          </td>
                          <td class="minimum-wage-col">
                            <h6 class="wage-heading">Minimum<br>Wage</h6>
                          </td>
                          <td class="wage-gap-col">
                            <h6 class="wage-heading">The<br>Gap</h6>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div><!--/single-adult-->

            </div><!--/sort-grid-->

          </div>

          <div class="intro-text">
            <p>MIT’s <a href="http://livingwage.mit.edu/" target="_blank">Living Wage Calculator</a> estimates the cost of living (“living wage”) in each of the nation's counties and major metropolitan areas, and compares it to the minimum wage for a variety of household types. Mapped here are three types: parent with spouse and two children, single parent with one child, and single adult.</p>
            <p>Variations in the gap between living wage and minimum wage occur for a variety of reasons. A city with a relatively high minimum wage, for instance, may still show a large gap due to a high cost of living. Conversely, living expenses tend to be lower in rural areas, making even a relatively low minimum wage come closer to meeting basic household needs.</p>
          </div>
        </div>
      </div>

      <div id="map" class="map region-center" data-active-layer="working-parent-counties">
        <div id="county-toggle-wrapper" class="county-toggle-wrapper">
          <table>
            <tr>
              <td class="btn-toggle county-toggle active">County Map</td>
              <td class="btn-toggle metro-toggle">City Map</td>
            </tr>
          </table>
        </div>
        <div id="home-button" class="home-btn-wrapper">
          <div class="icon-home"></div>
        </div>
        <div id="geocoder" class="geocoder-control leaflet-control geocoder-control-expanded">
          <input type="text" class="geocoder-control-input leaflet-bar" placeholder="Search County or City">
          <span class="icon-search geocoder-icon"></span>
        </div>
        <div class="tooltip-wrapper">
          <div class="top-arrow"></div>
          <div class="tooltip"></div>
          <div class="bottom-arrow"></div>
        </div>
      </div>
    </div><!--/content-->

  </div>

  <script src="javascript/require/require.js"></script>
  {% if environment === 'development' %}
  <script>
    require.config({
      baseUrl: {{ JSON.stringify(require.baseUrl) }},
      paths: {{ JSON.stringify(require.paths) }},
      shim: {{ JSON.stringify(require.shim) }},
      enforceDefine: true
    });
    require(['app/core/Core']);
  </script>
  {% else %}
  <script>
    require(['javascript/app.js']);
  </script>
  {% endif %}

</body>
</html>