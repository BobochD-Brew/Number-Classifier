// Addddd softmax
// add epoch
//Optimizeeeee
// better cost
//Mini bench
function sigmoid(x){
    return 1 / (1+Math.exp(-x));
}
function nothing(x){
    return x
}
function dsigmoid(x){
    return x*(1-x);
}
function sigmoidsign(x){
    if(x<0) return -1
    else return 1;
}
function squarr(x){
    return x*x;
}
class neuralNetwork {
    constructor (layersInfos,lr) {
        this.infos = layersInfos;
        this.rate = lr;
        this.input_nodes = layersInfos[0];
        this.output_nodes = layersInfos[layersInfos.length - 1];
        this.weights = [];
        for(let i = 0; i<this.infos.length-1;i++){
            this.weights[i] = new matrix(this.infos[i+1],this.infos[i]); 
            this.weights[i].randomize();
        }
        this.bias = [];
        for(let i = 0; i<this.infos.length-1;i++){
            this.bias[i] = new matrix(this.infos[i+1],1) ;
            this.bias[i].randomize();
        }
    }

    feedforward(input_array){
        let input = matrix.from1DArray(input_array);
        let Mat_WI = matrix.multiply(this.weights[0 ],input);
        for(let i = 0;i<this.infos.length-1;i++){
            if(i != 0) Mat_WI = matrix.multiply(this.weights[i],Mat_WI);
            Mat_WI.add_to(this.bias[i]);
            Mat_WI = Mat_WI.fx(sigmoid);
        }
        let output = Mat_WI;
        return output.toSimpleArray();    
    }   


    train(input_array,answer){
        /// Guess the target :
        let input = matrix.from1DArray(input_array);
        let Mat_WI = matrix.multiply(this.weights[0],input);
        let Historique = [];
        Historique[0] = input;
        for(let i = 0;i<this.infos.length-1;i++){
            if(i != 0) Mat_WI = matrix.multiply(this.weights[i],Mat_WI);
            Mat_WI.add_to(this.bias[i]);
            Mat_WI = Mat_WI.fx(sigmoid);
            Historique[i+1] = Mat_WI
        }
        let output = Mat_WI;
        /// Callculation of error :
        let guess = output;
        let target = matrix.from1DArray(answer);
        let error = [];
        error[0] = matrix.sum(target,matrix.scale(guess,-1));
        for(let i = 1;i < this.infos.length - 1;i++){
            
            error[i]= matrix.multiply(matrix.transpose(this.weights[this.infos.length -1-i]),error[i-1]);
        }
        /// Callculing Adaptation weights : 
        let delta_bias = [];
        let delta_weight = [];
        for(let i=0;i < this.infos.length-1 ;i++){
            let gradient = Historique[this.infos.length-1-i].fx(dsigmoid);
            gradient = matrix.multiply_each(error[i],gradient);
            gradient = matrix.scale(gradient,this.rate);
            delta_bias[this.weights.length-1-i] = gradient;
            delta_weight[this.weights.length-1-i] = matrix.multiply(gradient,matrix.transpose(Historique[this.infos.length-2-i]));
            
        }
        /// Adapting weigths : 
        for(let i = 0;i<this.weights.length;i++){
            this.weights[i].add_to(delta_weight[i]);
            this.bias[i].add_to(delta_bias[i]);
        }
        
        return error[0];
    }
}
