import unittest
import requests


class testapi(unittest.TestCase):
    URL =  'http://http://127.0.0.1:5000/users'
    URL2 = 'http://http://127.0.0.1:5000/annonces'
   
    
    
    def test1_get_all_users(self) :
        response = requests.get(self.URL)
        self.assertEqual(response.status_code,200)
        self.assertEqual(len(response.json()),6)#nombre users
        print ('Test one completed')
        
    expected_result={ #here i need to put infos of annonce with id=1
       "theme": "math",
       "description": "for once",
       "tarif": 4,
       "modalite": "offline",
       "categorie": "college",
       "adresse": 10,
       "titre": "one",
       "annonce_id" : 1,
      "date_created" : ""
       }
    
    
    data = {
         "theme": "math",
         "description": "for once",
         "tarif": 4,
         "modalite": "offline",
         "categorie": "college",
         "adresse": 10,
         "titre": "one"
        }

    def test2_post_new_annonce(self):
        resp = requests.post(self.URL2 , json= self.data)
        self.assertEqual(resp.status_code,200) 
        print("TEST 2 completed")
      
        
   
    def test3_get_annonce_by_id(self): 
        resp = requests.get(self.URL + '/1')
        self.assertEqual(resp.status_code , 200)
        self.assertDictEqual(resp.json(),self.expected_result)
        print('TEST 3 completed')

if __name__ == "__main__" :   
    tester = testapi()
    tester.test1_get_all_users()
    tester.test2_post_new_annonce()
    tester.test3_get_annonce_by_id()
    
#navigate  to when test folder puis je fais python tests.py