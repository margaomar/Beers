import $ from './jquery';
    beerHomeBeer(); // call the homepage first

    class Beer { //class 
        constructor (name, description, image_url, abv, ibu, ph, tagline, ingredients) {
        this.name = name;
        this.description = description;
        this.image_url = image_url;
        this.abv = abv;
        this.ibu = ibu;
        this.ph = ph;
        this.tagline = tagline;
        this.malt = ingredients.malt;
        this.hops = ingredients.hops;
        this.yeast = ingredients.yeast
        }
        getColorClass(ph) { //loop alert colour on the different beers ph values

            if (ph > 5) {
                return 'alert-hight';
            }
            else if (ph < 5 && ph >= 4.4){
                return 'alert-medium';
            }
            else if(ph < 4.4 ) {
                return 'alert-low';
            }
        } 
        getBeerData(){ //method homepage

            let phColor = this.getColorClass(this.ph);
            return `<article class="item-containers">
                        <figure><img src=${this.image_url} alt="${this.name}"></figure>
                        <div class="item-description"><h1>${this.name}</h1><p>${this.description}</p></div>
                        <ul class="item-values">
                            <li>ABV<span>${this.abv}</span></li>
                            <li>IBU<span>${this.ibu}</span></li>
                            <li class="${phColor}">pH<span>${this.ph}</span></li>
                        </ul>
                    </article>`
        }   
        getBeerDetData(){ //method ramdom
            
            let phColor = this.getColorClass(this.ph);
            return `<article class="section-detail">
                        <div class="item-containers quick-section">
                            <figure><img src=${this.image_url} alt="${this.name}"></figure>
                            <div class="item-description">
                                <h1>${this.name}</h1>
                                <h2>${this.tagline}</h2>
                                <p>${this.description}</p>
                            </div>
                            <ul class="item-values">
                                <li>ABV<span>${this.abv}</span></li>
                                <li>IBU<span>${this.ibu}</span></li>
                                <li class="${phColor}">pH<span>${this.ph}</span></li>
                            </ul>
                            <button class="btn-item-modal">Ingredients</button>
                            <button class="btn-section-another">Give me another beer</button>
                        </div>
                    </article>`

        }
        getBeerModal(){ //pop up information

            let maltString = '';
            let hopsString = '';
            let yeastString = this.yeast;
            let malt = this.malt;
            let hops = this.hops;

            maltString += `${malt[0].name} (${malt[0].amount.value} ${malt[0].amount.unit})`

            hopsString += `${hops[0].name} (${hops[0].amount.value} ${hops[0].amount.unit})`

            return `<div class="modal-container">
                        <h3 class="modal-tittle">INGREDIENTS <span class="modal-closed">x</span></h3>
                        <div class="modal-description">
                            <h3>Malt:</h3>
                            <p>${maltString}</p>
                            <h3>Hops:</h3>
                            <p>${hopsString}</p>
                            <h3>Yeast:</h3>
                            <p>${yeastString}</p>
                        </div>
                    </div>`
        }
        
    }//ends class Beer
    
    function getPickABeer(){ //method pick a beer form

        return `<article class="section-detail">
                    <div class="item-containers pick-section">
                    <h1 class="tittle">Pick a Beer</h1>
                    <form>
                        <div class="form-group-one">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" id="name" aria-describedby="name">
                            <label for="hops">Hops</label>
                            <input type="text" class="form-control" id="hops" aria-describedby="hops">
                        </div>
                        <div class="form-group-two">
                            <label for="abv">ABV</label>
                            <input type="text" class="form-control" id="abv" aria-describedby="abv">
                            <label for="ibu">IBU</label>
                            <input type="text" class="form-control" id="ibu" aria-describedby="ibu">
                            <label for="ebc">EBC</label>
                            <input type="text" class="form-control" id="ebc" aria-describedby="ebc">
                        </div>
                        <div class="form-button">
                            <button type="submit" class="beer-find">Find Beer</button>
                        </div>
                    </form> 
                    </div>
                </article>`
    }

    // set some initial variables
    var $beersWrap = $('.grid-container');
    //Add active class when press on beers
    $(".beers").on('click', function() {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        beerHomeBeer(); //call the homepage
        $('.pagination').removeClass('hide');
        // add second menu again
        $('.main-menu').removeClass('hide');
        $('header').removeClass('hide-nav');
    });
    
    //Get homepage
    function beerHomeBeer(){
        var url = "https://api.punkapi.com/v2/beers?page=1&per_page=6"; //Get beers homepage
        $.ajax({  
            url: url,
            method: 'GET',
        }).done(function(data){
                $beersWrap.empty();
                for(let i=0; i<data.length; i++){
                    //calling the data by the class Beer
                    let beer = new Beer(data[i].name, data[i].description, data[i].image_url, data[i].abv, data[i].ibu, data[i].ph, data[i].tagline, data[i].ingredients);
                    $beersWrap.append(beer.getBeerData());                     
                    //add active class
                    $('.beers').addClass("active");
                };
                // method> create the function e.a print it into the page
                // properties=>name, description...description
                // object=> one beers
        });
    }; //ends function beerHomeBeer

    //filter
    // $(".kegs").on('click', function() {
    // });

    // const result = data.filter(data => "image_url"="https://images.punkapi.com/v2/keg.png");


    //Paginacion
    $(".pag-number").on('click', "li", function() { //Paginacion
        $(this).siblings().removeClass("active");
        $(this).addClass("active");

        // add second menu again
        $('.main-menu').removeClass('hide');
        $('header').removeClass('hide-nav');
        
        var page = $(this).text();
        var url = "https://api.punkapi.com/v2/beers?page=" + page + "&per_page=6";
        $.ajax({  
            url: url,
            method: 'GET',
        }).done(function(data){
            $beersWrap.empty();
            for(let i=0; i<6; i++){
                //calling the data by the class Beer
                let beer = new Beer(data[i].name, data[i].description, data[i].image_url, data[i].abv, data[i].ibu, data[i].ph, data[i].tagline, data[i].ingredients);
                $beersWrap.append(beer.getBeerData());
            }
        });
    });

    // Random
    $('.quick-find').on('click', random);// Random call on click
    function random(){ //Quick find (Random) + modal, using getBeerDetData
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        //remove second menu and pag
        $('.main-menu').addClass('hide');
        $('header').addClass('hide-nav');
        $(".pagination").addClass("hide");

        var url = "https://api.punkapi.com/v2/beers/random";
        $.ajax({  
            url: url,
            method: 'GET',
        }).done(function(data){
            $beersWrap.empty();
            for(let i=0; i<1; i++){
                //calling the data by the class Beer
                let beer = new Beer(data[i].name, data[i].description, data[i].image_url, data[i].abv, data[i].ibu, data[i].ph, data[i].tagline, data[i].ingredients);
                $beersWrap.append(beer.getBeerDetData());

                //getBeerModal()
                $('.btn-item-modal').on('click', function() {
                    $('.section-detail').append(beer.getBeerModal());
                    $('.modal-backdrop').addClass('show');
                });
                $('.grid-container').on('click', '.modal-closed', function(){
                    $('.modal-container').addClass('hide');
                    $('.modal-backdrop').removeClass('show');
                });
            }
        });
    };

    $('.grid-container').on('click', ".btn-section-another", random);// Another beer random button call
    $('.pick-beer').on('click', function(){ // Pick a beer section
        $(this).siblings().removeClass("active");
        $(this).addClass("active");

        $beersWrap.empty();
        $beersWrap.append(getPickABeer());
        
        //remove second menu and pag
        $('.main-menu').addClass('hide');
        $('header').addClass('hide-nav');
        $(".pagination").addClass("hide");
    });