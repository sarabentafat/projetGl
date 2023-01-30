from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome('./chromedriver')
driver.get("http://localhost:3000/addannonce")

title_input = driver.find_element(By.ID, "titre")
theme_input = driver.find_element(By.ID, "theme")
description_input = driver.find_element(By.ID, "description")
modalité_input = driver.find_element(By.ID,"modalité")
catégorie_input = driver.find_element(By.ID,"catégorie")
wilaya_input = driver.find_element(By.ID,"wilaya")
commune_input = driver.find_element(By.ID,"commune")
bienImmobilier_input = driver.find_element(By.ID,"bienImmobilier")
tarif_input = driver.find_element(By.ID,"tarif")
submit_button = driver.find_element(By.ID,"submit-button")

title_input.send_keys("Test annonce")
theme_input.send_keys("Testing")
description_input.send_keys("This is a test annonce.")
modalité_input.send_keys("online")
catégorie_input.send_keys("lycee")
wilaya_input.send_keys("Alger")
commune_input.send_keys("Bab Ezzouar")
bienImmobilier_input.send_keys("123 Main St.")
tarif_input.send_keys(str(100.0))
submit_button.click()

wait = WebDriverWait(driver, 10)
wait.until(EC.url_changes("http://localhost:3000/addannonce"))

assert driver.current_url == "http://localhost:3000/annonces"
driver.close()