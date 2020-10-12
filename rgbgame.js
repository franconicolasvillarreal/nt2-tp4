Vue.component('gameheader', { 
    data() {
		return{
            
        }
    },
    props: ['myColor'],
    methods: {
    },
    template: `
    <div id="header">
		<h1>
			The Great Guessing Game
			<br>
			<span id="colorDisplay">rgb({{myColor.r}}, {{myColor.g}}, {{myColor.b}})</span>	
        </h1>
	</div> `
})

Vue.component('buttons', { 
    data() {
		return{
            isHard:true,
            colorCount:6
        }
    },
    props: ['myColor','colors', 'message'],
    created(){
        this.restart()
    },
    methods: {
        dificultadEasy(){
            if (this.isHard) {
                this.isHard = false;
                this.colorCount = 3;
                this.restart();
            }
        },
        dificultadHard(){
            if (!this.isHard) {
                this.isHard = true;
                this.colorCount = 6;
                this.restart();
            }
        },
        restart(){
            this.colors.splice(0, this.colors.length, ...this.createNewColors(this.colorCount));
            let pickedColor = this.colors[this.pickColor()];
            this.myColor.r = pickedColor.r;
            this.myColor.g = pickedColor.g;
            this.myColor.b = pickedColor.b;
        },
        createNewColors(numbers){
            let arr = [];
            for (var i = 0; i < numbers; i++) {
                arr.push(this.createRandomStringColor());
            }
            return arr;
        },
        createRandomStringColor(){
            return {
                r: this.randomInt(),
                g: this.randomInt(), 
                b: this.randomInt()
            };
        }, 
        randomInt(){
            return Math.floor(Math.random() * 256);
        },
        pickColor(){
            let quantity = 3;
            if (this.isHard) {
                quantity = 6;
            }
            return Math.floor(Math.random() * quantity );
        },        
},
    
    template: `
        <div id="navigator">
            <button id="reset" @click="restart">New colors</button>
            <span id="message"> {{message}} </span>
            <button id="easy" :class="{ selected: !isHard }" @click="dificultadEasy">easy</button>
            <button id="hard" :class="{ selected: isHard }" @click="dificultadHard">hard</button>
    
        </div>`
})

Vue.component('item', { 
    data() {
		return{
            backgroundColor: `rgb(${this.color.r},${this.color.g},${this.color.b})`
        };
    },
    props: ['color','index','getGanador'],
    methods: {
        mostrarColor(){
            colorclickeado= this.color;
            this.getGanador(colorclickeado, this.index);
        },
    },
    template: `
        <div id="container">
            <div class="square" :style="{'background-color': backgroundColor}" @click="mostrarColor"></div>
        </div>
     `
})

var app = new Vue({
    el: '#app',
    data: {
       myColor: {
           r: 0,
           g: 0,
           b: 0
       },
       colors: [],
       message:"",
       colorclickeado:"",
    },

    methods: {
        getGanador(colorcuadrado, cuadradoIndex){
            if(JSON.stringify(colorcuadrado) === JSON.stringify(this.myColor)){
                this.message="Ganaste";
                for (let index = 0; index < this.colors.length; index++) {
                    Object.assign(this.colors[index], colorcuadrado);
                  }
            }else{
                this.message="Intenta de nuevo";
                this.colors[cuadradoIndex].r = 35;
                this.colors[cuadradoIndex].g = 35;
                this.colors[cuadradoIndex].b = 35;
            }
        },
        myKey(color){
            const randomNumber = Math.random() * 100000;
            return '' + randomNumber + color.r +color.g +color.b;
        }
    },
})