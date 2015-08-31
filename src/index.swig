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

    <div class="intro"></div>

    <div class="content">

      <div class="info-pane region-left">
        <div class="header region-top">
          <a href="//storymaps.arcgis.com" target="_blank" class="smLink region-left">A story map</a>
          <div class="share region-center">
            <span class="share-icon icon-facebook"></span>
            <span class="share-icon icon-twitter"></span>
            <span class="share-icon icon-link"></span>
          </div>
          <a href="//esri.com" target="_blank" class="logo region-right"></a>
        </div>
        <div class="main region-center">

          <div class="intro-text">
            <h1>The <span class="callout"><strong>Living Wage</strong></span> Map</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio adipisci quisquam aspernatur, vitae molestiae quo odit! Nisi amet animi reiciendis. Distinctio vitae quis quae minus iure odio et sed aperiam voluptas voluptate velit sunt id quos quidem eaque nesciunt doloribus reiciendis tempora, nulla eum libero. Ea, expedita quidem itaque quibusdam qui ducimus enim sapiente aperiam at porro accusamus officiis dolorem, voluptatibus debitis labore ipsam perspiciatis adipisci iusto placeat. Magnam dolores facilis, eaque qui! Consequuntur eveniet reprehenderit tempora deleniti explicabo illum qui, enim ducimus. Quia ex asperiores recusandae dolore temporibus dolorum earum neque hic assumenda excepturi eaque animi, rerum doloremque voluptatem.</p>
          </div>

          <div class="statistics-pane">

            <div class="headings">
              <h4 class="location-name"></h4>
              <table class="wage-headings">
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
            </div><!--/headings-->

            <div class="working-parent wage-group active">
              <div class="heading-area">
                <h5 class="class-heading">Parent with Spouse and Two Kids</h5>
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
                <table class="graph">
                  <tbody>
                    <tr>
                      <td class="living-wage-col">
                        <div class="graph-bar"></div>
                      </td>
                      <td class="minimum-wage-col">
                        <div class="graph-bar"></div>
                      </td>
                      <td class="wage-gap-col">
                        <div class="graph-bar"></div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div><!--/working-parent-->

            <div class="single-parent wage-group">
              <div class="heading-area">
                <h5 class="class-heading">Single Parent with One Child</h5>
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
                <table class="graph">
                  <tbody>
                    <tr>
                      <td class="living-wage-col">
                        <div class="graph-bar"></div>
                      </td>
                      <td class="minimum-wage-col">
                        <div class="graph-bar"></div>
                      </td>
                      <td class="wage-gap-col">
                        <div class="graph-bar"></div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div><!--/single-parent-->

            <div class="single-adult wage-group">
              <div class="heading-area">
                <h5 class="class-heading">Single Adult</h5>
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
                <table class="graph">
                  <tbody>
                    <tr>
                      <td class="living-wage-col">
                        <div class="graph-bar"></div>
                      </td>
                      <td class="minimum-wage-col">
                        <div class="graph-bar"></div>
                      </td>
                      <td class="wage-gap-col">
                        <div class="graph-bar"></div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div><!--/single-adult-->

          </div>
        </div>
      </div>

      <div id="map" class="map region-center" data-active-layer="working-parent-counties">
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