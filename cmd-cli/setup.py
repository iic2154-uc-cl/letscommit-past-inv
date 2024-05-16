from setuptools import setup, find_packages

setup(
    name='letscommit',
    version='1.0.7',
    author='Agustin Rios',
    author_email='arios6@uc.cl',
    description='Recommendation system for commit messages',
    long_description=open("README.md").read() + "\n\n" + open("CHANGELOG.md").read(),
    long_description_content_type="text/markdown",
    packages=find_packages(),
    entry_points={
        'console_scripts': [
            'letscommit=letscommit.cli:main',
        ],
    },
    install_requires=open("./requirements.txt").read().splitlines(),
)