class matrix {
    constructor(r,c){
        this.rows = r;
        this.columns = c;
        this.data = [];
        for(let i=0;i<this.rows;i++){
            this.data[i] = [];
            for(let j=0;j<this.columns;j++){
                this.data[i][j] = 0;
            }
        }
    }

    static from1DArray (m_array) {
        let m = new matrix(m_array.length,1);
        for(let i=0;i<m_array.length;i++){
            m.data[i][0] = m_array[i];
        } 

        return m
    }

    static scale (m,number) {
        let m2 = new matrix(m.rows,m.columns);
        for(let i=0;i<m.rows;i++){
            for(let j=0;j<m.columns;j++){
                m2.data[i][j] = m.data[i][j]*number;
            }
        }

        return m2
    }

    static sum (m1,m2) {
        let m3 = new matrix(m1.rows,m1.columns);
        for(let i=0;i<m1.rows;i++){
            for(let j=0;j<m1.columns;j++){
                m3.data[i][j] = m1.data[i][j] + m2.data[i][j];
            }
        }

        return m3
    }

    add_to (m2) {
        for(let i=0;i<this.rows;i++){
            for(let j=0;j<this.columns;j++){
                this.data[i][j] += m2.data[i][j];
            }
        }

        return this
    }

    static multiply (m1,m2) {
        let f = new matrix(m1.rows,m2.columns);
        for(let i=0;i<m1.rows;i++){
            for(let d=0;d<m2.columns;d++){
                for(let j=0;j<m1.columns;j++){
                    f.data[i][d] += m1.data[i][j] * m2.data[j][d];
                }   
            }
        }

        return f
    }
    
    static multiply_each (m1,m2) {
        let m3 = new matrix(m1.rows,m1.columns);
        for(let i=0;i<m1.rows;i++){
            for(let j=0;j<m1.columns;j++){
                m3.data[i][j] = m2.data[i][j] * m1.data[i][j];
            }
        }

        return m3
    }

    static transpose(m){
        let m2 = new matrix(m.columns,m.rows);
        for(let i=0;i<m.rows;i++){
            for(let j=0;j<m.columns;j++){
                m2.data[j][i] = m.data[i][j];
            }
        }

        return m2
    }

    print(){
        console.table(this.data);
    }

    randomize(){
        for(let i=0;i<this.rows;i++){
            for(let j=0;j<this.columns;j++){
               this.data[i][j] = random(-1,1);
            }
        }

        return this
    }

    toSimpleArray(){
        let array_ret = [];
        for(let i=0;i<this.rows;i++){
            array_ret[i] = this.data[i][0];
        }

        return array_ret;
    }

    fx (fn) {
        let m2 = new matrix(this.rows,this.columns);
        for(let i=0;i<this.rows;i++){
            for(let j=0;j<this.columns;j++){
                m2.data[i][j] = fn(this.data[i][j],i,j);
            }
        }

        return m2
    }
}