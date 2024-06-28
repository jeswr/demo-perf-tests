import { DataFactory } from 'n3';

const { quad, variable, namedNode } = DataFactory;

export const SUBCLASS_RULE = [{
  premise: [quad(
    variable('?s'),
    namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
    variable('?o'),
  ), quad(
    variable('?o'),
    namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
    variable('?o2'),
  )],
  conclusion: [
    quad(
      variable('?s'),
      namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      variable('?o2'),
    ),
  ],
}];

export const RDFS_RULE = [{
  premise: [quad(
    variable('?s'),
    namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
    variable('?o'),
  ), quad(
    variable('?o'),
    namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
    variable('?o2'),
  )],
  conclusion: [
    quad(
      variable('?s'),
      namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      variable('?o2'),
    ),
  ],
},
{
  premise: [quad(
    variable('?s'),
    variable('?p'),
    variable('?o'),
  )],
  conclusion: [
    quad(
      variable('?p'),
      namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property'),
    ),
  ],
},
{
  premise: [quad(
    variable('?a'),
    namedNode('http://www.w3.org/2000/01/rdf-schema#domain'),
    variable('?x'),
  ), quad(
    variable('?u'),
    variable('?a'),
    variable('?y'),
  )],
  conclusion: [
    quad(
      variable('?u'),
      namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      variable('?x'),
    ),
  ],
},
{
  premise: [quad(
    variable('?a'),
    namedNode('http://www.w3.org/2000/01/rdf-schema#range'),
    variable('?x'),
  ), quad(
    variable('?u'), // With rules like this we *do not* need to iterate over the subject index so we should avoid doing so
    variable('?a'),
    variable('?v'),
  )],
  conclusion: [
    quad(
      variable('?v'),
      namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      variable('?x'),
    ),
  ],
},
{
  premise: [quad(
    variable('?u'),
    variable('?a'),
    variable('?x'),
  )],
  conclusion: [
    quad(
      variable('?u'),
      namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      namedNode('http://www.w3.org/2000/01/rdf-schema#Resource'),
    ),
    quad(
      variable('?x'),
      namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      namedNode('http://www.w3.org/2000/01/rdf-schema#Resource'),
    ),
  ],
},
{
  premise: [quad(
    variable('?u'),
    namedNode('http://www.w3.org/2000/01/rdf-schema#subPropertyOf'),
    variable('?v'),
  ), quad(
    variable('?v'),
    namedNode('http://www.w3.org/2000/01/rdf-schema#subPropertyOf'),
    variable('?x'),
  )],
  conclusion: [
    quad(
      variable('?u'),
      namedNode('http://www.w3.org/2000/01/rdf-schema#subPropertyOf'),
      variable('?x'),
    ),
  ],
},
{
  premise: [quad(
    variable('?u'),
    namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
    namedNode('http://www.w3.org/2000/01/rdf-schema#Class'),
  )],
  conclusion: [
    quad(
      variable('?u'),
      namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
      namedNode('http://www.w3.org/2000/01/rdf-schema#Resource'),
    ),
  ],
},
{
  premise: [quad(
    variable('?u'),
    namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
    variable('?x'),
  ), quad(
    variable('?v'),
    namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
    variable('?u'),
  )],
  conclusion: [
    quad(
      variable('?v'),
      namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      variable('?x'),
    ),
  ],
}, {
  premise: [quad(
    variable('?u'),
    namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
    namedNode('http://www.w3.org/2000/01/rdf-schema#Class'),
  )],
  conclusion: [
    quad(
      variable('?u'),
      namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
      variable('?u'),
    ),
  ],
},
{
  premise: [quad(
    variable('?u'),
    namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
    variable('?v'),
  ), quad(
    variable('?v'),
    namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
    variable('?x'),
  )],
  conclusion: [
    quad(
      variable('?u'),
      namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
      variable('?x'),
    ),
  ],
}, {
  premise: [quad(
    variable('?u'),
    namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
    namedNode('http://www.w3.org/2000/01/rdf-schema#ContainerMembershipProperty'),
  )],
  conclusion: [
    quad(
      variable('?u'),
      namedNode('http://www.w3.org/2000/01/rdf-schema#subPropertyOf'),
      namedNode('http://www.w3.org/2000/01/rdf-schema#member'),
    ),
  ],
},
{
  premise: [quad(
    variable('?u'),
    namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
    namedNode('http://www.w3.org/2000/01/rdf-schema#Datatype'),
  )],
  conclusion: [
    quad(
      variable('?u'),
      namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
      namedNode('http://www.w3.org/2000/01/rdf-schema#Literal'),
    ),
  ],
},
];
