import { faCheck, faPlus, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Select from "react-select";
import { useQueryLesson } from '../../hooks/useLesson';
import { VocabularyDTO } from '../../types/Lession';

interface VocabularyFormData {
  word: string;
  meaning: string;
  pronunciation: string;
}

interface ModalVocabularyProps {
  isOpen: boolean;
  onClose: () => void;
  vocabulary?: VocabularyDTO;
}

export default function ModalVocabulary({ isOpen, onClose, vocabulary }: ModalVocabularyProps) {
  const [vocabularyList, setVocabularyList] = useState<VocabularyFormData[]>([
    { word: '', meaning: '', pronunciation: '' }
  ]);
  const [errors, setErrors] = useState<Record<number, Record<string, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data } = useQueryLesson();
  const lessons = data?.lesson || [];
  const [lessonId, setLessonId] = useState<number | "">("");


  const handleInputChange = (index: number, field: keyof VocabularyFormData, value: string | number) => {
    setVocabularyList(prev => prev.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    ));

  };

  const addVocabulary = () => {
    setVocabularyList(prev => [
      ...prev,
      { word: '', meaning: '', pronunciation: '' }
    ]);
  };

  const removeVocabulary = (index: number) => {
    if (vocabularyList.length > 1) {
      setVocabularyList(prev => prev.filter((_, i) => i !== index));
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[index];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<number, Record<string, string>> = {};
    let isValid = true;

    vocabularyList.forEach((vocab, index) => {
      const itemErrors: Record<string, string> = {};

      if (!vocab.word.trim()) {
        itemErrors.word = 'Vietnamese word is required';
        isValid = false;
      }

      if (!vocab.meaning.trim()) {
        itemErrors.meaning = 'English meaning is required';
        isValid = false;
      }

      if (!vocab.pronunciation.trim()) {
        itemErrors.pronunciation = 'Pronunciation is required';
        isValid = false;
      }



      if (Object.keys(itemErrors).length > 0) {
        newErrors[index] = itemErrors;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // await onSave(vocabularyList);
      onClose();
    } catch (error) {
      console.error('Error saving vocabularies:', error);
    } finally {
      setIsSubmitting(false);
    }
  };


  const options = lessons.map(lesson => ({
    value: lesson.id,
    label: lesson.title
  }));
  const handleExport = async () => {
    try {

      const link = document.createElement("a");
      link.setAttribute("download", "vocabularies.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Export failed", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {vocabulary ? 'Edit Vocabulary' : 'Add New Vocabularies'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {vocabulary
                ? 'Update vocabulary information'
                : `Create ${vocabularyList.length} vocabulary ${vocabularyList.length > 1 ? 'entries' : 'entry'}`
              }
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faTimes} className="text-lg" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className='flex justify-between'>
              <div>
                <Select
                  options={options}
                  onChange={(option) =>
                    setLessonId(option ? option.value : "")
                  }
                  placeholder="Chọn bài học..."
                  isSearchable
                  className="w-64"
                />
              </div>
              <button
                type="button"
                onClick={handleExport}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
              >
                Export Excel
              </button>

            </div>

            {vocabularyList.map(
              (vocab, index) =>
              (
                <div key={index} className="border border-gray-200 rounded-xl p-6 relative">
                  {vocabularyList.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVocabulary(index)}
                      className="absolute top-4 right-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors duration-200"
                      title="Remove this vocabulary"
                    >
                      <FontAwesomeIcon icon={faTrash} className="text-sm" />
                    </button>
                  )}

                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Vocabulary {index + 1}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Vietnamese Word */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vietnamese Word <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={vocab.word}
                          onChange={(e) => handleInputChange(index, 'word', e.target.value)}
                          placeholder="Enter Vietnamese word..."
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent text-lg font-medium transition-colors duration-200 ${errors[index]?.word ? 'border-red-300 bg-red-50' : 'border-gray-200'
                            }`}
                        />

                      </div>
                    </div>

                    {/* English Meaning */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        English Meaning <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={vocab.meaning}
                        onChange={(e) => handleInputChange(index, 'meaning', e.target.value)}
                        placeholder="Enter English meaning..."
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent transition-colors duration-200 ${errors[index]?.meaning ? 'border-red-300 bg-red-50' : 'border-gray-200'
                          }`}
                      />
                      {errors[index]?.meaning && (
                        <p className="text-red-500 text-sm mt-1">{errors[index].meaning}</p>
                      )}
                    </div>

                    {/* Pronunciation */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pronunciation <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={vocab.pronunciation}
                        onChange={(e) => handleInputChange(index, 'pronunciation', e.target.value)}
                        placeholder="Enter pronunciation guide..."
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent italic transition-colors duration-200 ${errors[index]?.pronunciation ? 'border-red-300 bg-red-50' : 'border-gray-200'
                          }`}
                      />
                      {errors[index]?.pronunciation && (
                        <p className="text-red-500 text-sm mt-1">{errors[index].pronunciation}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        Example: "sin chao" for "Xin chào"
                      </p>
                    </div>


                  </div>

                  {vocab.word && vocab.meaning && (
                    <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                      <h4 className="text-sm font-medium text-blue-800 mb-2">Preview</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold text-gray-900">{vocab.word}</span>

                        </div>
                        <p className="text-gray-700">{vocab.meaning}</p>
                        <p className="text-sm italic text-gray-500">{vocab.pronunciation}</p>

                      </div>
                    </div>
                  )}
                </div>
              ))}


            {/* Add More Button - Only show in add mode */}
            {!vocabulary && (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={addVocabulary}
                  className="px-6 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[#007AFF] hover:text-[#007AFF] transition-colors duration-200 flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faPlus} className="text-sm" />
                  Add Another Vocabulary
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-500">
            {vocabularyList.length} vocabulary {vocabularyList.length > 1 ? 'entries' : 'entry'} to save
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 bg-[#007AFF] hover:bg-[#0056CC] text-white rounded-lg font-medium flex items-center gap-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faCheck} className="text-sm" />
                  {vocabulary ? 'Update' : `Create ${vocabularyList.length} ${vocabularyList.length > 1 ? 'Vocabularies' : 'Vocabulary'}`}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}