Backend setup
```
install MongoDB: https://docs.mongodb.com/manual/administration/install-community/

start MongoDB:
    (macos) brew services start mongodb-community@5.0
    (linux) sudo systemctl start mongodb

download & install conda:

    download miniconda from here:   https://docs.conda.io/projects/conda/en/latest/user-guide/install/linux.html

    install download with:          bash Miniconda3-latest-Linux-x86_64.sh

cd backend

conda create --name my-site (web-dev) python=3.10

conda activate my-site (web-dev)

pip install -r requirements.txt

If any new packages are installed, update the requirements.txt:

pip freeze > requirements.txt

Run backend:

uvicorn main:app --reload