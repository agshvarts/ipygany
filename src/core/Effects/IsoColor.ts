import * as THREE from 'three';
import * as Nodes from 'three/examples/jsm/nodes/Nodes';

import {
  Effect, InputDimension
} from '../EffectBlock';

import {
  Block
} from '../Block';

import {
  Component
} from '../Data';

import {
  NodeOperation
} from '../NodeMesh';


export
class IsoColor extends Effect {

  constructor (parent: Block, inputComponent: [string, string], min: number, max: number) {
    super(parent, [inputComponent]);

    const textureLoader = new THREE.TextureLoader();
    this.textureNode = new Nodes.TextureNode(textureLoader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGMAAAABCAMAAAD92eD2AAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAEsUExURUQCVUUGWUYKXUcNYEcRZEgVZ0gZa0gcbkgfcEgjdEgmdkgpeUcte0cvfUYzf0U2gUQ5g0M8hEI/hUFCh0BFiD9IiT5Lij1OijtRizpTizlWjDhajDZcjTVfjTRhjTJkjjFmjjBpji9sji5uji1xjixyjit1jip4jil6jih9jid/jiaCjiWEjiSGjiOJjiKLjSGOjSGRjCCSjB+Vix+Xix+aih6ciR+fiB+hhyCjhiGmhSOohCWrgietgSmvfy2yfTC0ezS2eTi5dzy7dUC9ckS/cErBbU/Da1TFaFnHZF7JYWTLXmrNW3DPV3bRU33ST4PUS4rVR5DXQ5fYP57ZOqTbNqvcMrLdLbneKMDfJcfgIM7hHdTiGtvjGOLkGOnlGu/lHPbmH/vnI////6dkNu4AAAABYktHRGNcvi2qAAAAB3RJTUUH4wISEh00Ha7gTwAAAIl6VFh0UmF3IHByb2ZpbGUgdHlwZSBleGlmAAAImVWO0Q3DMAhE/5kiI2DAB4xTRYnUDTp+cJzK7fuA0wkO6Pi8T9oGjYWseyABLiwt5VUieKLMTbiNXnXydG2lZNmkMgUynG0N2uN/6YrA6eaOjh27VLocKhpVa49GKo83coV43D/U2X//1j/QBUTJLDCZZckEAAAAbElEQVQI12NgYGRiZmFlY+fg5OLm4eXjFxAUEhYRFROXkJSSlpGVk1dQVFJWUVVT19DU0tbR1dM3MDQyNjE1M7ewtLK2sbWzd3B0cnZxdXP38PTy9vH18w8IDAoOCQ0Lj4iMio6JjYtPSEwCAHgmEvTi4/F5AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTAyLTE4VDE4OjI5OjUyKzAxOjAwUKWXygAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0wMi0xOFQxODoyOTo1MiswMTowMCH4L3YAAAAWdEVYdGV4aWY6RXhpZkltYWdlTGVuZ3RoADl2GPUTAAAAF3RFWHRleGlmOkV4aWZJbWFnZVdpZHRoADg4OE4hyKYAAAASdEVYdGV4aWY6RXhpZk9mZnNldAA2Njd3Z2EAAAAddEVYdGV4aWY6U29mdHdhcmUAU2hvdHdlbGwgMC4yOC40Lr5VtAAAAABJRU5ErkJggg=='));

    const functionNode = new Nodes.FunctionNode(
      `vec3 isoColorFunc${this.id}(sampler2D textureMap, float isoColorMin, float isoColorMax, float data){
        vec2 colorPosition = vec2((data - isoColorMin) / (isoColorMax - isoColorMin), 0.0);

        return vec3(texture2D(textureMap, colorPosition));
      }`
    );

    this.isoColorMinNode = new Nodes.FloatNode(min);
    this.isoColorMaxNode = new Nodes.FloatNode(max);

    console.log(this.inputNode);
    this.functionCallNode = new Nodes.FunctionCallNode(functionNode, [this.textureNode, this.isoColorMinNode, this.isoColorMaxNode, this.inputNode]);

    this.addColorNode(NodeOperation.ASSIGN, this.functionCallNode);

    this.buildMaterials();
  }

  set min (value: number) {
    this.isoColorMinNode.value = value;
  }

  get min () {
    return this.isoColorMinNode.value;
  }

  set max (value: number) {
    this.isoColorMaxNode.value = value;
  }

  get max () {
    return this.isoColorMaxNode.value;
  }

  get inputDimension () : InputDimension {
    return 1;
  }

  private functionCallNode: Nodes.FunctionCallNode;

  private isoColorMinNode: Nodes.FloatNode;
  private isoColorMaxNode: Nodes.FloatNode;

  private textureNode: Nodes.TextureNode;

  protected inputs: [Component];
  protected inputNode: Nodes.Node;

}