import random
import json
import pickle
import numpy as np

import nltk
from nltk.stem import WordNetLemmatizer

import tensorflow as tf
from keras import layers, models, optimizers, Sequential, Input

# Initialize lemmatizer
lemmatizer = WordNetLemmatizer()

# Load intents
with open('intents.json') as file:
    intents = json.load(file)

words = []
classes = []
documents = []
ignore_letters = ['?', '!', '.', ',']

# Extract words, classes, and documents
for intent in intents['intents']:
    for pattern in intent['patterns']:
        word_list = nltk.word_tokenize(pattern)
        words.extend(word_list)
        documents.append((word_list, intent['tags']))  # note: 'tag' not 'tags'
        if intent['tags'] not in classes:
            classes.append(intent['tags'])

# Lemmatize and lower case words, remove ignored letters
words = [lemmatizer.lemmatize(word.lower()) for word in words if word not in ignore_letters]
words = sorted(set(words))
classes = sorted(set(classes))

# Save words and classes
pickle.dump(words, open('words.pkl', 'wb'))
pickle.dump(classes, open('classes.pkl', 'wb'))

# Create training data
training = []
output_empty = [0] * len(classes)

for document in documents:
    bag = []
    word_patterns = document[0]
    word_patterns = [lemmatizer.lemmatize(word.lower()) for word in word_patterns]
    for word in words:
        bag.append(1 if word in word_patterns else 0)

    output_row = list(output_empty)
    output_row[classes.index(document[1])] = 1
    training.append((bag, output_row))

random.shuffle(training)
train_x = np.array([bag for bag, _ in training], dtype=np.float32)
train_y = np.array([output for _, output in training], dtype=np.float32)

# Build model with explicit Input layer
model = Sequential()
model.add(Input(shape=(len(train_x[0]),)))
model.add(layers.Dense(128, activation='relu'))
model.add(layers.Dropout(0.5))
model.add(layers.Dense(64, activation='relu'))
model.add(layers.Dropout(0.5))
model.add(layers.Dense(len(train_y[0]), activation='softmax'))

# Compile model with SGD optimizer
sgd = optimizers.SGD(learning_rate=0.01, momentum=0.9, nesterov=True)
model.compile(loss='categorical_crossentropy', optimizer=sgd, metrics=['accuracy'])

# Train model
model.fit(train_x, train_y, epochs=200, batch_size=5, verbose=1)

# Save model
model.save('chatbot.h5')
