<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description"
          content="Explore the power of Smart Rockets AI - a full autonomous script that learns and evolves to find optimal paths to reach the goal. Witness cutting-edge JavaScript technology in action.">
    <meta name="keywords"
          content="Smart Rockets, AI, Artificial Intelligence, JavaScript, Autonomous Script, Evolutionary Algorithm, Pathfinding">
    <meta name="author" content="Ezequiel Pereira">

    <title>JavaScript Smart Rockets AI: Autonomous Learning Pathfinding | By Ezequiel Pereira</title>
    <meta property="og:title" content="Smart Rockets AI Showcase">
    <meta property="og:description"
          content="Explore the power of Smart Rockets AI - a full autonomous script that learns and evolves to find optimal paths to reach the goal. Witness cutting-edge JavaScript technology in action.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://ezequielhpp.net/smart-rockets">
    <meta property="og:image" content="https://ezequielhpp.net/smart-rockets/img/og.jpg">
    <meta property="og:site_name" content="Ezequiel Pereira Portfolio">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Smart Rockets AI Showcase">
    <meta name="twitter:description"
          content="Explore the power of Smart Rockets AI - a full autonomous script that learns and evolves to find optimal paths to reach the goal. Witness cutting-edge JavaScript technology in action.">
    <meta name="twitter:image" content="https://ezequielhpp.net/smart-rockets/img/twitter.jpg">
    <script type="application/ld+json">
        {
            "@context": "http://schema.org",
            "@type": "WebPage",
            "name": "Smart Rockets AI Showcase",
            "description": "Explore the power of Smart Rockets AI - a full autonomous script that learns and evolves to find optimal paths to reach the goal. Witness cutting-edge JavaScript technology in action.",
            "url": "https://ezequielhpp.net/smart-rockets",
            "author": {
                "@type": "Person",
                "name": "Ezequiel Pereira"
            },
            "image": {
                "@type": "ImageObject",
                "url": "https://ezequielhpp.net/smart-rockets/img/schema_image.jpg",
                "width": 800,
                "height": 600
            }
        }
    </script>
    <meta http-equiv="Cache-Control" content="max-age=290304000, public">
    <meta property="og:locale" content="en_GB">
    <meta property="og:locale:alternate" content="en_GB">
    <meta property="og:locale:alternate" content="en_US">
    <meta name="robots" content="index,follow,max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta http-equiv="Content-Security-Policy"
          content="default-src 'self' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'">
    <link rel="apple-touch-icon" sizes="180x180" href="/smart-rockets/img/icons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/smart-rockets/img/icons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/smart-rockets/img/icons/favicon-16x16.png">
    <link rel="manifest" href="/smart-rockets/img/icons/site.webmanifest">
    <link rel="mask-icon" href="/smart-rockets/img/icons/safari-pinned-tab.svg" color="#5bbad5">
    <link rel="shortcut icon" href="/smart-rockets/img/icons/favicon.ico">
    <meta name="msapplication-TileColor" content="#2b5797">
    <meta name="msapplication-config" content="/smart-rockets/img/icons/browserconfig.xml">
    <meta name="theme-color" content="#ffffff">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<main>
    <header>
        <h1>Smart Rockets AI</h1>
        <p>
            <a href="https://github.com/EzequielHPP/smart-rockets" target="_blank" rel="noopener">Source Code</a>
            by
            <a href="https://ezequielhpp.net" target="_blank" rel="noopener">Ezequiel Pereira</a>
        </p>
    </header>
    <section>
        <div id="canvasContainer"></div>
        <div class="stats">
            <p id="generation">Generation: 0</p>
            <p id="completed">Completed: 0</p>
            <p id="crashed">Crashed: 0</p>
        </div>
        <div class="controls">
            <div>
                <label for="numberOfRockets">Population</label>
                <input type="range" id="numberOfRockets" name="numberOfRockets" min="1" max="100" value="25">
                <output for="numberOfRockets">25</output>
            </div>
            <div>
                <label for="mutationRate">Mutation Rate</label>
                <input type="range" id="mutationRate" name="mutationRate" min="0" max="1" step="0.01" value="0.01">
                <output for="mutationRate">0.01</output>
            </div>
            <div>
                <label for="lifeSpan">Lifespan</label>
                <input type="range" id="lifeSpan" name="lifeSpan" min="1" max="1000" value="400">
                <output for="lifeSpan">400</output>
            </div>
            <div>
                <label for="maxForce">Max Force</label>
                <input type="range" id="maxForce" name="maxForce" min="0" max="1" step="0.01" value="0.2">
                <output for="maxForce">0.2</output>
            </div>
            <div>
                <label for="numberOfObstacles">Obstacles</label>
                <input type="range" id="numberOfObstacles" name="numberOfObstacles" min="0" max="10" value="2">
                <output for="numberOfObstacles">2</output>
            </div>
            <div>
                <button id="startButton">Start</button>
                <button id="stopButton">Stop</button>
                <button id="resetButton">Reset</button>
            </div>
        </div>
    </section>
    <footer>
        <p>© <?php echo date('Y'); ?> <a href="https://ezequielhpp.net" target="_blank" rel="noopener">Ezequiel
                Pereira</a></p>
        <p>Powered by <a href="https://p5js.org/" target="_blank" rel="noopener">p5.js</a></p>
    </footer>
</main>
<script src="js/p5.min.js" type="application/javascript"></script>
<script src="js/population.js" type="application/javascript"></script>
<script src="js/rockets.js" type="application/javascript"></script>
<script src="js/dna.js" type="application/javascript"></script>
<script src="js/main.js" type="application/javascript"></script>
</body>
</html>
