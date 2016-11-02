import React from 'react'
import web3 from './web3'

export default class Web3Info extends React.Component {

    constructor() {
        super()
        //this.getInfos = this.getInfos.bind(this)
        this.state = {
            apiVersion: "",
            nodeVersion: "",
            networkVersion: "",
            ethVersion: "",
            coinbase: ""
        }
    }

    getInfos() {
        const coinbasePromise = new Promise((resolve, reject) => {
            web3.eth.getCoinbase((error, result) => {
                if (error) {
                    return reject(error)
                }
                resolve(result)
            })
        })
        const nodePromise = new Promise((resolve, reject) => {
            web3.version.getNode((error, result) => {
                if (error) {
                    return reject(error)
                }
                resolve(result)
            })
        })
        const networkPromise = new Promise((resolve, reject) => {
            web3.version.getNetwork((error, result) => {
                if (error) {
                    return reject(error)
                }
                resolve(result)
            })
        })

        const allReady = Promise.all([coinbasePromise, nodePromise, networkPromise])
        allReady.then(results => {
            const [ coinbase, nodeVersion, networkVersion ] = results
            this.setState({
                coinbase,
                nodeVersion,
                networkVersion,
                apiVersion : web3.version.api
            })
        }, _error => { console.error(_error) })
    }

    componentWillMount() {
        this.getInfos.apply(this)
    }

    render() {
        const {apiVersion, nodeVersion, networkVersion, ethVersion, coinbase} = this.state
        return (
            <div>
                <h3>Web3 Info</h3>
                <div>coinbase : {coinbase}</div>
                <div>api version : {apiVersion}</div>
                <div>node version : {nodeVersion}</div>
                <div>networkVersion : {networkVersion}</div>
            </div>
        );
    }
}
