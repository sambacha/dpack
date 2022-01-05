const debug = require('debug')('dpack:test')
const want = require('chai').expect
const fs = require('fs')

import { PackBuilder } from '../src/builder';
import * as dpack from '../src/pure'

const fbpack = JSON.parse(fs.readFileSync('test/sample-pack.json'))

describe('pure api', ()=>{
  it('blank', ()=>{
    const p = dpack.blank('testnet');
    want(p.format).exists;
    want(p.network).exists;
    want(p.objects).exists;
    want(p.types).exists;
  })

  it('sample pack', ()=>{
    const pack = dpack.fromObject(fbpack);
    want(dpack.schema.isWellFormedPack(pack)).true
  })
});

describe('PackBuilder', ()=>{
  it('blank', async ()=>{
    const pb = new PackBuilder('testnet');
    const p = pb.build();
    want(p.format).exists;
    want(p.network).exists;
    want(p.objects).exists;
    want(p.types).exists;
  });

  it('addType valid', async ()=>{
    const pb = new PackBuilder('testnet');
    pb.addType({
      typename: "GemFab",
      artifact: {abi:{}}
    });
    const p = pb.build();
    debug(JSON.stringify(p, null, 2))
  })
});
