import unittest
import requests

#3 tests unitaires : 


class testapi(unittest.TestCase):
    URL =  'http://127.0.0.1:5000/users'
    URL2 = 'http://127.0.0.1:5000/annonces'
   
    
    #le test num 1 raméne tous les utilisateurs de la base de données
    def test1_get_all_users(self) :
        response = requests.get(self.URL)
        self.assertEqual(response.status_code,200)
        self.assertEqual(len(response.json()),2)#vérifie si le nombre d'utilisateurs pris est égal à 6
        print ('Test one completed')
        
        #les résultats attendus si on choisis une certaine annonce avec un certain id
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
    
    # les infos à envoyer pour créer une nouvelle annonce
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
        print('TEST 3 completed') #si il reussis it displays TEST 3 completed 

if __name__ == "__main__" :   
    tester = testapi()
    tester.test1_get_all_users() #calls test 1
    #tester.test2_post_new_annonce() #calls test  2 
    #tester.test3_get_annonce_by_id() #calls test 3s
    
#navigate  to when test folder puis je fais python tests_unitaires.py