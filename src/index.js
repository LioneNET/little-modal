import LittleModal from './Little-Modal.js'
import './style.scss'

export default {

  //обертка для класса
  init: (o={}) => {
  	let instance = null

  	return {
  		open: (params={}) => {
		  	instance = instance === null ? new LittleModal(o) : instance
		  	instance.open(params);
		  },

		  close: () => {
		  	if(instance !== null)
		  		instance.close()
		  	else 
		  		console.log('is it already closed')
		  }
  	}
  }
}