import Mock from 'mockjs'
var Random = Mock.Random;

Mock.mock(
  '/rapidtop',
  'get', {
    'list|2': [{
        "id|+1": 1,
        "title": '@cword(4)',
        "subtitle": '@cword(7)',
        
    }] 
  }
)
Mock.mock(
  '/rapiddown',
  'get', {
    'list|5': [{
        "id|+1": 1,
        "title": '@cword(4)',
      
        
    }] 
  }
)

Mock.mock(
  '/inform',
  'get', {
    'list|2': [{
        "id|+1": 1,
        "title": '@cword(12)',
      
        
    }] 
  }
)