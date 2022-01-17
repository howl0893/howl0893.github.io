Backend setup
```
install MongoDB: https://docs.mongodb.com/manual/administration/install-community/

start MongoDB (macos): brew services start mongodb-community@5.0

download & install conda:

    download miniconda from here:   https://docs.conda.io/projects/conda/en/latest/user-guide/install/linux.html

    install download with:          bash Miniconda3-latest-Linux-x86_64.sh

cd backend

conda create --name my-site python=3.10

conda activate my-site

pip install -r requirements.txt

If any new packages are installed, update the requirements.txt:

pip freeze > requirements.txt

Run backend:

uvicorn main:app --reload