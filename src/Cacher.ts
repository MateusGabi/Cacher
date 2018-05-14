/**
 * Cacher
 * 
 * @author Mateus Gabi Moreira <mateusgabimoreira@gmail.com>
 */
class Cacher<T> {

    /**
     * data that will be stored
     */
    data: T|undefined;

    /**
     * time in seconds to update data value
     */
    interval: number;

    /**
     * function that update new results
     */
    resolver: (previousData?: T, updateCounter?: number) => T;


    /* control attributes */

    /**
     * expiration date
     */
    expires_in: Date;

    /**
     * number of times a cache data was updated
     */
    update_counter: number;

    constructor(resolver: (previousData?: T, updateCounter?: number) => T, data?: T|undefined, interval?: number) {
        this.data = data
        this.interval = interval || 3600
        this.resolver = resolver


        /* control attributes */
        const now = new Date();
        now.setSeconds(now.getSeconds() + this.interval)

        this.expires_in = now
        this.update_counter = 0
    }

    /**
     * checks if data is valid
     * 
     * @returns {boolean} isValid
     */
    dataIsValid(): boolean {
        const now = new Date()      

        if(!this.data) {
            return false
        }
        
        if(this.expires_in.getTime() < now.getTime()) {
            return false
        }

        return true
    }


    /**
     * Get data value
     * 
     * @returns {T} data
     */
    getData(): T {

        if (!this.dataIsValid()) {

            let now = new Date()
            now.setSeconds(now.getSeconds() + this.interval)

            this.expires_in = now
            
            this.data = this.resolver(this.data, ++this.update_counter)
        }

        return this.data || <T> {}
    }
}


export default Cacher