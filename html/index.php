<!DOCTYPE HTML>
<!--
	Prologue by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
-->
<html>
<head>
    <title>Chuppa Home Hunting</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <!--[if lte IE 8]>
    <script src="../assets/js/ie/html5shiv.js"/><![endif]-->
    <link rel="stylesheet" href="../assets/css/main.css"/>
    <!--[if lte IE 8]>
    <link rel="stylesheet" href="../assets/css/ie8.css"/><![endif]-->
    <!--[if lte IE 9]>
    <link rel="stylesheet" href="../assets/css/ie9.css"/><![endif]-->
    <script src="http://openlayers.org/en/v3.11.2/build/ol.js"></script>
    <link rel="stylesheet" href="http://openlayers.org/en/v3.11.2/css/ol.css" type="text/css">
    <script src="../assets/js/proj4.js"></script>
    <!-- Scripts -->

    <script src="../assets/js/jquery.min.js"></script>
    <script src="../assets/js/jquery.scrolly.min.js"></script>
    <script src="../assets/js/jquery.scrollzer.min.js"></script>
    <script src="../assets/js/skel.min.js"></script>
    <script src="../assets/js/util.js"></script>
    <!--[if lte IE 8]>
    <script src="../assets/js/ie/respond.min.js"></script><![endif]-->
    <script src="../assets/js/main.js"></script>
</head>
<body>


<?php
function write_file($x)
{
    file_put_contents('../res/district_mitte_limited.geojson', json_encode($x));
}

?>

<!-- Header -->
<div id="header">

    <div class="top">

        <!-- Nav -->
        <nav id="nav">
            <ul>
                <li><a href="#map" id="map-link" class="skel-layers-ignoreHref"><span
                            class="icon fa-map-o">Map</span></a></li>
                <li><a href="#add_appartment" id="add_appartment-link" class="skel-layers-ignoreHref"><span
                            class="icon fa-home">Add Appartment</span></a>
                </li>
                <li><a href="#" id="hw_green" class="skel-layers-ignoreHref"><span
                            class="icon fa-bicycle">Bicycle friendly filter</span></a>
                </li>
                <li><a href="#" id="hw_trafficlight" class="skel-layers-ignoreHref"><span
                            class="icon fa-pie-chart">Population filter</span></a>
                </li>

                <li><a href="#" id="hw_trafficlight" class="skel-layers-ignoreHref"><span class="icon fa-pie-chart">Show buildings by area
                        <select id="district_selection" class="filter ">
                            <!--                            <option value="none" selected></option>-->
                            <!--							<option value="click" selected></option>-->
                            <!--							<option value="singleclick">Single-click</option>-->
                            <!--							<option value="pointermove">Hover</option>-->
                            <!--							<option value="altclick">Alt+Click</option>-->
                            <!--							<option value="none">None</option>-->
                        </select>
                  </span></a></li>


            </ul>
        </nav>


        <!-- Logo -->
        <div id="logo">
            <!--            <h1 id="district">Select district to show all buildings in area</h1>-->

        </div>


    </div>


    <div class="bottom">

        <!--        <div>-->
        <!--            <ul class="icons actions ">-->
        <!--               -->
        <!--            </ul>-->
        <!--        </div>-->

        <!-- Logo -->
        <div id="logo">
            <!--            <span class="image avatar48"><img src="../images/avatar.jpg" alt=""/></span>-->
            <h1 id="title">Galina Litkin</h1>
            <p>TU Berlin</p>
        </div>
    </div>

</div>

<!-- Main -->
<div id="main">

    <!-- Intro -->
    <section id="top" class="one dark cover">
        <div class="container">

            <header>
                <h2 class="alt"><strong>Chuppa Home Hunting</strong></h2>
                <p>Find your home in Berlin</p>
            </header>
            <!--<footer>-->
            <!--<a href="#portfolio" class="button scrolly">Magna Aliquam</a>-->
            <!--</footer>-->
        </div>
    </section>

    <!-- Map-->
    <section  class="two">
        <div id="map" class="map_container">
            <div id="msgBox" class="msgBox" style="background-color: white">
                <a href="#" id="btnClose" style="float: right;"> <i class="fa fa-times"></i></a>
                <div id="msgContent" class="msgContent"></div>
                <div id="btnAddRemoveDiv" class="12u$">
                    <input id="linkAddApartment" type="button" value="Add to DB"/>
                </div>
            </div>
        </div>
    </section>


    <!-- Add_appartment -->
    <section id="add_appartment" class="three">
        <div class="container">

            <header>
                <h2>Add Apartment</h2>
            </header>
            <p>Add apartment description and your contact details</p>

            <form id="addApartmentForm">
                <div class="row">
                    <div class="6u 12u$(mobile)"><input type="text" name="name" placeholder="Name"/></div>
                    <div class="6u$ 12u$(mobile)"><input type="text" name="email" placeholder="Email"/></div>
                    <div class="6u$ 12u$(mobile)"><input type="text" name="phone" placeholder="Phone"/></div>
                    <div class="6u$ 8u$(mobile)"><textarea name="description"
                                                           placeholder="Apartment description"></textarea></div>
                    <div class="12u$">
                        <a href="#map"><input id="save_to_db_form" type="submit" value="Publish"/></a>
                    </div>
                </div>
            </form>

        </div>
    </section>

</div>

<!-- Footer -->
<div id="footer">


    <!-- Copyright -->
    <ul class="copyright">
        <li>&copy; Untitled. All rights reserved.</li>
        <li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
    </ul>

</div>

</body>
</html>